import { Request, Response } from "../../base/types";
import { PortalBaseRouter } from "../router";
import { IndexHandler } from "../handlers/index-handler";

export class IndexRouter extends PortalBaseRouter {
  constructor() {
    super("/");
  }

  protected createHander(req: Request, res: Response) {
    return new IndexHandler(this.formatInput(req, res));
  }
}
