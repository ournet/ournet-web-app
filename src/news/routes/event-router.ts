import { Request, Response } from "../../base/types";
import { NewsBaseRouter, NewsBaseRouterData } from "../router";
import { EventHandler } from "../handlers/event-handler";
import { EventViewModelInput } from "../view-models/event-view-model";

interface EventRouterData extends NewsBaseRouterData {
    id: string
}

export class EventRouter extends NewsBaseRouter<EventRouterData> {
    constructor() {
        super('/story/[^/]+-([^/]+)', ['id'])
    }

    protected createHander(req: Request, res: Response, data: EventRouterData) {
        const input = this.formatInput<EventViewModelInput>(req, res);
        input.id = data.id;
        return new EventHandler(input);
    }
}
