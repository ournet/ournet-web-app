import { WeatherBaseRouter } from "../router";
import { Request, Response } from "../../base/types";
import { DataHandler } from "../../base/data-handler";
import coinWebData from "../../coin-web-data";
import { json } from "micro";

export class CoinWebDataRouter extends WeatherBaseRouter {
  constructor() {
    super("/coin-web-data");
  }

  protected createHander(req: Request, res: Response) {
    if (!["POST", "GET", "PUT"].includes(req.method || ""))
      throw new Error("Method not allowed");

    const handler = new DataHandler({
      req,
      res,
      data: getData(req),
      code: 200,
      headers: { "Content-Type": "application/json; charset=UTF-8" }
    });

    handler.setCacheControl(0);

    return handler;
  }
}

const getData = async (req: Request) => {
  if (!["POST", "GET"].includes(req.method || ""))
    throw new Error("Method not allowed");

  const key = req.headers["x-coin-web-data-key"];
  const url = new URL(req.url || "/", "http://localhost");
  const action = url.searchParams.get("action");
  if (req.method === "POST") {
    const body = await json(req, { limit: "1mb" });

    if (action === "ADD") {
      if (key !== process.env.COIN_WEB_DATA_KEY) {
        throw new Error("Unauthorized");
      }
      if (!body) return { error: "No data provided" };

      return coinWebData.addWebDataRequest(body as never);
    } else {
      return coinWebData
        .postData((body as any).output as never)
        .catch((e) => console.error(e.message))
        .then(() => ({ status: "ok" }));
    }
  }

  return coinWebData.fetchData().then((r) => r || {});
};
