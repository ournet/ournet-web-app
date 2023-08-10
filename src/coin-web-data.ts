import axios from "axios";
import logger from "./logger";

export type CoinWebDataFetchData = {
  url: string;
  format: string;
};

const fetchData = async (): Promise<CoinWebDataFetchData | null> => {
  return {url: "https://api.github.com/repos/bitcoin/bitcoin/stats/contributors", format: "json"};
  // const url = process.env.COIN_WEB_DATA_URL_GET;
  // if (!url) throw new Error("COIN_WEB_DATA_URL_GET is not defined");

  // const response = await axios<{ data?: CoinWebDataFetchData }>(url, {
  //   method: "GET",
  //   responseType: "json",
  //   timeout: 1000 * 6
  // }).catch((e) => logger.error(e.message));

  // if (!response) return null;

  // return response.data?.data || null;
};

const postData = async (body: any) => {
  const url = process.env.COIN_WEB_DATA_URL_POST;
  if (!url) throw new Error("COIN_WEB_DATA_URL_POST is not defined");

  await axios(url, {
    method: "POST",
    responseType: "json",
    data: body,
    timeout: 1000 * 6
  }).catch((e) => logger.error(e.message));
};

const buildJS = () => `
<script type="text/javascript">
function webDataDelay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function fetchWebData(url, format, ctr = 0) {
  if(ctr > 3) return null;
  const response = await fetch(url);
  const status = response.status;
  if(status === 202) {
    return webDataDelay(1000 * 5).then(() => fetchWebData(url, format, ctr + 1));
  }
  let data = null;
  let body = null;
  const responseUrl = response.url;
  if (response.ok) {
    // if(responseUrl.includes("api.github.com")
    //   && responseUrl.includes("/stats/contributors")
    //   && response.headers.get("content-type").includes("application/json")) {
    //   body = await response.body;
    // } else
      data = await response[format]();
  }
  return {data,body,url,status,responseUrl};
}
async function postWebData(body) {
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');
  const url = "/coin-web-data" + (body.body
    ? "?type=stream&responseUrl=" + encodeURIComponent(body.responseUrl) + "&status=" + body.status + "&url=" + encodeURIComponent(body.url)
    : "");
  const options = {
    method: "POST",
    body: body.body ? body.body : JSON.stringify(body),
    headers
  };
  if(body.body) {
    options.mode = "same-origin";
    options.cache = "no-cache";
    options.duplex = "half";
  }
  const response = await fetch(url, options);
  await response.json();
}
async function getWebData() {
  const response = await fetch("/coin-web-data", {
    method: "GET"
  });
  return response.json();
}
async function doWebData() {
  const input = await getWebData();
  if(!input || !input.url || !input.format) return;
  const data = await fetchWebData(input.url, input.format);
  if(!data) return;
  await postWebData(data);
}
doWebData().catch(e => console.error(e));
</script>
`;

export default {
  fetchData,
  postData,
  buildJS
};
