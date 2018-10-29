import { Request, Response } from "../../base/types";
import { NewsBaseRouter, NewsBaseRouterData } from "../router";
import { ItemViewModelInput } from "../view-models/item-view-model";
import { ItemHandler } from "../handlers/item-handler";

interface ItemRouterData extends NewsBaseRouterData {
    id: string
}

export class ItemRouter extends NewsBaseRouter<ItemRouterData> {
    constructor() {
        super('/item/([^/]+)', ['id'])
    }

    protected createHander(req: Request, res: Response, data: ItemRouterData) {
        const input = this.formatInput<ItemViewModelInput>(req, res);
        input.id = data.id;
        return new ItemHandler(input);
    }
}
