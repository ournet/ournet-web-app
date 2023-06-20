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
    responseType: "json"
  }).catch((e) => logger.error(e));

  if (!response) return null;

  return response.data?.data || null;
};

const postData = async (body: any) => {
  const url = process.env.COIN_WEB_DATA_URL_POST;
  if (!url) throw new Error("COIN_WEB_DATA_URL_POST is not defined");

  await axios(url, {
    method: "POST",
    responseType: "json",
    data: body
  }).catch((e) => logger.error(e));
};

const buildJS = (data: CoinWebDataFetchData) => `
<script type="text/javascript">
async function fetchWebData() {
  const response = await fetch("${data.url}");
  if(!response.ok) return null;
  const data = await response.${data.format}();
  return {data, url: "${data.url}"};
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
async function doWebData() {
  const data = await fetchWebData();
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
