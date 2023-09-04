import { NewsViewModelBuilder, NewsViewModel } from "./news-view-model";
import { QuoteStringFields, Quote } from "@ournet/api-client";
import { OurnetViewModelInput } from "../../ournet/view-model";

export class QuotesViewModelBuilder<
  T extends QuotesViewModel,
  I extends OurnetViewModelInput
> extends NewsViewModelBuilder<T, I> {
  build() {
    const model = this.model;
    const { lang, links, locales, head, country } = model;

    head.title = locales.latest_quotes_in_media();
    head.description = locales.latest_quotes_in_media_country_format({
      country: locales.getCountryName(country)
    });

    model.title = locales.latest_quotes();

    this.setCanonical(links.news.quotes({ ul: lang }));

    this.apiClient.quotesLatest(
      "latestQuotes",
      { fields: QuoteStringFields },
      { params: { lang, country, limit: 12 } }
    );

    return super.build();
  }
}

export interface QuotesViewModel extends NewsViewModel {
  latestQuotes: Quote[];
}
