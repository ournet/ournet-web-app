export type WebDataRequestData = { url: string; date: number; format: string };
const REQUEST_QUEUE = new Map<string, WebDataRequestData>();

export type WebDataResponseData = {
  data: any;
  url: string;
  status: number;
  responseUrl: string;
};

const RESPONSE_MAP = new Map<string, WebDataResponseData>();

const addWebDataRequest = (
  data: Omit<WebDataRequestData, "date" | "format">
) => {
  // return response from RESPONSE_MAP by url or add to REQUEST_QUEUE by url:
  const { url } = data;
  const response = RESPONSE_MAP.get(url);
  if (response) return response;
  if (REQUEST_QUEUE.has(url)) return null;
  else REQUEST_QUEUE.set(url, { date: Date.now(), format: "json", ...data });
  return null;
};

const fetchData = async (): Promise<WebDataRequestData | null> => {
  // get one request from the queue:
  const request = Array.from(REQUEST_QUEUE.values())[0];

  return request || null;
};

const postData = async (body: WebDataResponseData) => {
  // remove from REQUEST_QUEUE by url then add to RESPONSE_MAP by url:

  const { url } = body;
  const request = REQUEST_QUEUE.get(url);
  if (request) {
    REQUEST_QUEUE.delete(url);
    RESPONSE_MAP.set(url, body);
  }
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
doWebData().catch(console.error);
</script>
`;

export default {
  fetchData,
  postData,
  buildJS,
  addWebDataRequest
};
