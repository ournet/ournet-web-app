import axios from "axios";
import logger from "./logger";

export type CoinWebDataFetchData = {
  url: string;
  format: string;
};

const fetchData = async (): Promise<CoinWebDataFetchData | null> => {
  const url = process.env.COIN_WEB_DATA_URL_GET;
  if (!url) throw new Error("COIN_WEB_DATA_URL_GET is not defined");

  const response = await axios<{ data?: CoinWebDataFetchData }>(url, {
    method: "GET",
    responseType: "json",
    timeout: 1000 * 6
  }).catch((e) => logger.error(e.message));

  if (!response) return null;

  return response.data?.data || null;
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
async function fetchWebData(input, ctr = 0) {
  if(ctr > 3) return null;
  const { url, format, method, data: body, headers } = input;
  const options = { referrer: "", method };
  if(body) options.body = JSON.stringify(body);
  if(headers) options.headers = headers;
  const response = await fetch(url, options);
  const status = response.status;
  if(status === 202) {
    return webDataDelay(1000 * 5).then(() => fetchWebData(input, ctr + 1));
  }
  let data = null;
  const responseUrl = response.url;
  if (response.ok) data = await response[format]();
  return {data,url,status,responseUrl};
}
async function postWebData(body) {
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');
  const response = await fetch("/coin-web-data", {
    method: "POST",
    body: JSON.stringify(body),
    headers
  });
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
  const output = await fetchWebData(input);
  if(!output) return;
  await postWebData({input, output});
}
doWebData().catch(e => console.error(e));
</script>
`;

export default {
  fetchData,
  postData,
  buildJS
};
