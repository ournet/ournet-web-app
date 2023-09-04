import { Request, Response } from "../../base/types";
import { NewsBaseRouter, NewsBaseRouterData } from "../router";
import { ViewArticleHandler } from "../handlers/view-article-handler";
import { ArticleViewModelInput } from "../view-models/article-view-model";

interface ArticleRouterData extends NewsBaseRouterData {
  id: string;
}

export class ViewArticleRouter extends NewsBaseRouter<ArticleRouterData> {
  constructor() {
    super("/actions/view_article/([^/]+)", ["id"]);
  }

  protected createHander(req: Request, res: Response, data: ArticleRouterData) {
    const input = this.formatInput<ArticleViewModelInput>(req, res);
    input.id = data.id;
    return new ViewArticleHandler(input);
  }
}
