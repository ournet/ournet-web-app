import { NewsBaseRouter } from "../router";
import { Request, Response } from "../../base/types";
import { DataHandler } from "../../base/data-handler";

export class RobotsRouter extends NewsBaseRouter {
    constructor() {
        super('/robots.txt')
    }
    protected createHander(req: Request, res: Response) {
        const handler = new DataHandler({
            req, res,
            data: `User-agent: *
Disallow: /controls
Disallow: /actions
`,
            code: 200,
            headers: { 'Content-Type': 'text/plain; charset=UTF-8' },
        });

        handler.setCacheControl(60 * 24);

        return handler;
    }
}
