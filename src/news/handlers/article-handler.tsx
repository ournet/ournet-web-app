import * as React from "react";
import { NewsBaseHandler } from "./handler";
import { NewsAppData } from "../data";
import {
  ArticleViewModelInput,
  ArticleViewModelBuilder
} from "../view-models/article-view-model";
import ArticlePage from "../views/article/article-page";

export class ArticleHandler extends NewsBaseHandler<ArticleViewModelInput> {
  async handle(data: NewsAppData) {
    const viewData = await new ArticleViewModelBuilder(
      this.input,
      data
    ).build();

    this.setCacheControl(5);

    return this.render(<ArticlePage {...viewData} />);
  }
}
