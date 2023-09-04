import { Request, Response } from "../../base/types";
import { NewsBaseRouter, NewsBaseRouterData } from "../router";
import { shouldHideStory } from "../hide-story-ids";
import { RedirectHandler } from "../../base/redirect-handler";
import { ArticleViewModelInput } from "../view-models/article-view-model";
import { ArticleHandler } from "../handlers/article-handler";

interface ArticleRouterData extends NewsBaseRouterData {
  id: string;
}

export class ArticleRouter extends NewsBaseRouter<ArticleRouterData> {
  constructor() {
    super("/article/[^/]+-([^/]+)", ["id"]);
  }

  protected createHander(req: Request, res: Response, data: ArticleRouterData) {
    const input = this.formatInput<ArticleViewModelInput>(req, res);
    input.id = data.id;
    if (shouldHideStory(data.id))
      return new RedirectHandler({ location: "/", code: 301, req, res });

    return new ArticleHandler(input);
  }
}
