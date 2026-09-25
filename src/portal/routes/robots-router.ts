import { PortalBaseRouter } from "../router";
import { Request, Response } from "../../base/types";
import { DataHandler } from "../../base/data-handler";
import { AI_TRAINING_BOTS_ROBOTS } from "../../base/robots";

export class RobotsRouter extends PortalBaseRouter {
  constructor() {
    super("/robots.txt");
  }
  protected createHander(req: Request, res: Response) {
    const handler = new DataHandler({
      req,
      res,
      data: `User-agent: *
Disallow: /controls
Disallow: /actions

${AI_TRAINING_BOTS_ROBOTS}`,
      code: 200,
      headers: { "Content-Type": "text/plain; charset=UTF-8" }
    });

    handler.setCacheControl(60 * 24);

    return handler;
  }
}
