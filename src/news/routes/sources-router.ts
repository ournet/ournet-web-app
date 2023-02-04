import { Request, Response } from "../../base/types";
import { NewsBaseRouter } from "../router";
import { SourcesHandler } from "../handlers/sources-handler";

export class SourcesRouter extends NewsBaseRouter {
  constructor() {
    super("/sources");
  }

  protected createHander(req: Request, res: Response) {
    return new SourcesHandler(this.formatInput(req, res));
  }
}
