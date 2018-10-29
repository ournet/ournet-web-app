import { Request, Response } from "../../base/types";
import { NewsBaseRouter, NewsBaseRouterData } from "../router";
import { EventViewModelInput } from "../view-models/event-view-model";
import { ViewEventHandler } from "../handlers/view-event-handler";

interface EventRouterData extends NewsBaseRouterData {
    id: string
}

export class ViewEventRouter extends NewsBaseRouter<EventRouterData> {
    constructor() {
        super('/actions/view_story/([^/]+)', ['id'])
    }

    protected createHander(req: Request, res: Response, data: EventRouterData) {
        const input = this.formatInput<EventViewModelInput>(req, res);
        input.id = data.id;
        return new ViewEventHandler(input);
    }
}
