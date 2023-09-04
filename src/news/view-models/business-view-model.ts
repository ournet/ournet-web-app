import { NewsViewModelBuilder, NewsViewModel } from "./news-view-model";
import { OurnetViewModelInput } from "../../ournet/view-model";
import { LIST_ARTICLES_FIEDLS } from "../config";

export class BusinessViewModelBuilder extends NewsViewModelBuilder<
  NewsViewModel,
  OurnetViewModelInput
> {
  async build() {
    const { lang, links, locales, head, country } = this.model;

    head.title = locales.business();

    this.setCanonical(links.news.page("business", { ul: lang }));

    this.apiClient.findArticle(
      "latestArticles",
      { fields: LIST_ARTICLES_FIEDLS },
      { lang, country, limit: 16 }
    );

    return super.build();
  }
}
