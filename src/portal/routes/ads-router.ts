import { Request, Response } from "../../base/types";
import { PortalBaseRouter } from "../router";
import { AdsHandler } from "../handlers/ads-handler";

export class AdsRouter extends PortalBaseRouter {
  constructor() {
    super("/ads");
  }

  protected createHander(req: Request, res: Response) {
    return new AdsHandler(this.formatInput(req, res));
  }
}
