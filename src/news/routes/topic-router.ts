import { Request, Response } from "../../base/types";
import { NewsBaseRouter, NewsBaseRouterData } from "../router";
import { TopicHandler } from "../handlers/topic-handler";
import { TopicViewModelInput } from "../view-models/topic-view-model";

interface TopicRouterData extends NewsBaseRouterData {
    slug: string
}

export class TopicRouter extends NewsBaseRouter<TopicRouterData> {
    constructor() {
        super('/topic/([^/]+)', ['slug'])
    }

    protected createHander(req: Request, res: Response, data: TopicRouterData) {
        const input = this.formatInput<TopicViewModelInput>(req, res);
        input.slug = data.slug;
        return new TopicHandler(input);
    }
}
