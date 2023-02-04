import { NewsViewModelBuilder, NewsViewModel } from "./news-view-model";
import { readSources } from "news-sources";
import { OurnetViewModelInput } from "../../ournet/view-model";
import { NewsSource } from "news-sources/types/data";

export class SourcesViewModelBuilder<
  T extends SourcesViewModel,
  I extends OurnetViewModelInput
> extends NewsViewModelBuilder<T, I> {
  async build() {
    const model = this.model;
    const { lang, links, locales, head, country } = model;

    head.title = head.description = locales.news_sources_in_country_format({
      country: locales.getCountryName(country)
    });

    this.setCanonical(links.news.sources({ ul: lang }));

    const sources = await readSources(country);

    this.apiClient.newsTopSources(
      "sources",
      { fields: "id" },
      { params: { country, lang, limit: 100 } },
      (items) =>
        items
          .map((it) => sources.find((n) => n.id === it.id))
          .filter((it) => !!it)
    );

    return super.build();
  }
}

export interface SourcesViewModel extends NewsViewModel {
  sources: NewsSource[];
}
