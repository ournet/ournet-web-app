import { OurnetRouter } from "../router";
import { Request, Response } from "../../base/types";
import { DataHandler } from "../../base/data-handler";

export class AdsRouter extends OurnetRouter {
  constructor() {
    super("/ads.txt");
  }
  protected createHander(req: Request, res: Response) {
    const handler = new DataHandler({
      req,
      res,
      data: `google.com, pub-3959589883092051, DIRECT, f08c47fec0942fa0
mgid.com, 404611, DIRECT, d4c29acad76ce94f
`,
      code: 200,
      headers: { "Content-Type": "text/plain; charset=UTF-8" }
    });

    handler.setCacheControl(1 * 24);

    return handler;
  }
}
