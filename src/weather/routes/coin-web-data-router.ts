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
    if (!["POST", "GET"].includes(req.method || ""))
      throw new Error("Method not allowed");

    const handler = new DataHandler({
      req,
      res,
      data:
        req.method === "POST"
          ? json(req, { limit: "10mb" })
              .then((body) => coinWebData.postData(body))
              .catch((e) => console.error(e.message))
              .then(() => ({ status: "ok" }))
          : coinWebData.fetchData().then((r) => r || {}),
      code: 200,
      headers: { "Content-Type": "application/json; charset=UTF-8" }
    });

    handler.setCacheControl(0);

    return handler;
  }
}
