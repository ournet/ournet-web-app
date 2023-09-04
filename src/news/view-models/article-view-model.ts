import { NewsViewModel, NewsViewModelBuilder } from "./news-view-model";
import { Article, ArticleStringFields } from "@ournet/api-client";
import { notFound } from "boom";
import { OurnetViewModelInput } from "../../ournet/view-model";

export interface ArticleViewModelInput extends OurnetViewModelInput {
  id: string;
}

export interface ArticleViewModel extends NewsViewModel {
  article: Article;
}

export class ArticleViewModelBuilder extends NewsViewModelBuilder<
  ArticleViewModel,
  ArticleViewModelInput
> {
  async build() {
    const { id } = this.input;

    const localeApi = this.data.createQueryApiClient<{ article: Article }>();
    localeApi.articleById(
      "article",
      {
        fields: ArticleStringFields
      },
      { id }
    );

    const apiResult = await this.executeApiClient(localeApi);

    if (!apiResult.article) {
      throw notFound(`Not found article id=${id}`);
    }
    const model = this.model;

    const article = (model.article = apiResult.article);
    const { lang, links, head } = model;

    head.title = article.title;
    head.description = article.description;

    this.setCanonical(
      links.news.article(article.slug, article.id, { ul: lang })
    );

    return super.build();
  }
}
