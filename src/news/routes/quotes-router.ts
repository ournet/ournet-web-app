import { Request, Response } from "../../base/types";
import { NewsBaseRouter } from "../router";
import { RegExpRoutePattern } from "../../base/router";
import { QuotesHandler } from "../handlers/quotes-handler";

export class QuotesRouter extends NewsBaseRouter {
    constructor() {
        super(new RegExpRoutePattern(NewsBaseRouter.formatRouteRegExp('/quotes')))
    }

    protected createHander(req: Request, res: Response) {
        return new QuotesHandler(this.formatInput(req, res));
    }
}
