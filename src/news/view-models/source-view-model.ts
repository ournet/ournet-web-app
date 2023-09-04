import { NewsViewModelBuilder, NewsViewModel } from "./news-view-model";
import { NewsItem, NewsItemStringFields } from "@ournet/api-client";
import { OurnetViewModelInput } from "../../ournet/view-model";
import { notFound } from "boom";
import { NewsSource, getSource } from "news-sources";

export class SourceViewModelBuilder<
  T extends SourceViewModel,
  I extends SourceViewModelInput
> extends NewsViewModelBuilder<T, I> {
  async build() {
    const model = this.model;

    const { lang, country, locales, head, links } = model;
    let { slug } = this.input;
    slug = slug.toLowerCase().trim();
    const source = await getSource(country, slug);

    if (!source) throw notFound(`Not found source id=${slug}`);

    model.source = source;

    head.title = `${locales.latest_news()}: ${source.name}`;
    head.description = `${locales.latest_news()} - ${source.name}`;

    this.setCanonical(links.news.source(slug, { ul: lang }));

    this.apiClient.newsItemsLatestBySource(
      "news",
      { fields: NewsItemStringFields },
      { params: { lang, country, limit: 15, sourceId: slug } }
    );

    return super.build();
  }
}

export interface SourceViewModelInput extends OurnetViewModelInput {
  slug: string;
}

export interface SourceViewModel extends NewsViewModel {
  news: NewsItem[];
  source: NewsSource;
}
