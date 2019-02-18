import { Request, Response } from "../../base/types";
import { NewsBaseRouter, NewsBaseRouterData } from "../router";
import { QuoteHandler } from "../handlers/quote-handler";
import { QuoteViewModelInput } from "../view-models/quote-view-model";

interface QuoteRouterData extends NewsBaseRouterData {
    id: string
}

export class QuoteRouter extends NewsBaseRouter<QuoteRouterData> {
    constructor() {
        super('/quote/([^/]+)', ['id'])
    }

    protected createHander(req: Request, res: Response, data: QuoteRouterData) {
        const input = this.formatInput<QuoteViewModelInput>(req, res);
        input.id = data.id;
        return new QuoteHandler(input);
    }
}
