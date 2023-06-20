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
    if (req.method !== "POST") throw new Error("Method not allowed");
    // console.log("coin-web-data", req.method, req.url);

    const handler = new DataHandler({
      req,
      res,
      data: json(req)
        .then((body) => coinWebData.postData(body))
        .catch()
        .finally(() => ({ status: "ok" })),
      code: 200,
      headers: { "Content-Type": "application/json; charset=UTF-8" }
    });

    // handler.setCacheControl(60 * 24);

    return handler;
  }
}
