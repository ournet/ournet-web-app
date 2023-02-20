import { Request, Response } from "../../base/types";
import { TopicQuotesHandler } from "../handlers/topic-quotes-handler";
import { NewsBaseRouter, NewsBaseRouterData } from "../router";
import { TopicQuotesViewModelInput } from "../view-models/topic-quotes-view-model";

interface TopicRouterData extends NewsBaseRouterData {
  slug: string;
}

export class TopicQuotesRouter extends NewsBaseRouter<TopicRouterData> {
  constructor() {
    super("/topic/([^/]+)/quotes", ["slug"]);
  }

  protected createHander(req: Request, res: Response, data: TopicRouterData) {
    const input = this.formatInput<TopicQuotesViewModelInput>(req, res);
    input.slug = data.slug;
    return new TopicQuotesHandler(input);
  }
}
