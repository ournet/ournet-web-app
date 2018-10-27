import { Request, Response } from "../../base/types";
import { NewsBaseRouter } from "../router";
import { QuotesHandler } from "../handlers/quotes-handler";

export class QuotesRouter extends NewsBaseRouter {
    constructor() {
        super('/quotes')
    }

    protected createHander(req: Request, res: Response) {
        return new QuotesHandler(this.formatInput(req, res));
    }
}
