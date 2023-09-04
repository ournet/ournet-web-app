import { Request, Response } from "../../base/types";
import { BusinessHandler } from "../handlers/business-handler";
import { NewsBaseRouter } from "../router";

export class BusinessRouter extends NewsBaseRouter {
  constructor() {
    super("/business");
  }

  protected createHander(req: Request, res: Response) {
    return new BusinessHandler(this.formatInput(req, res));
  }
}
