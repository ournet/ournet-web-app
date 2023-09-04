import { NewsViewModelBuilder, NewsViewModel } from "./news-view-model";
import { QuoteStringFields, NewsEvent, Quote } from "@ournet/api-client";
import { OurnetViewModelInput } from "../../ournet/view-model";
import { notFound } from "boom";
import { LIST_EVENTS_FIEDLS } from "../config";
import { getPersonDisplayName } from "../helpers";
import { truncateAt } from "../../helpers";

export class QuoteViewModelBuilder<
  T extends QuoteViewModel,
  I extends QuoteViewModelInput
> extends NewsViewModelBuilder<T, I> {
  async build() {
    const model = this.model;

    const { lang, country, head, links } = model;
    let { id } = this.input;

    const localeApi = this.data.createQueryApiClient<{ quote: Quote }>();
    localeApi.quotesQuoteById("quote", { fields: QuoteStringFields }, { id });

    const apiResult = await this.executeApiClient(localeApi);

    if (!apiResult.quote) {
      throw notFound(`Not found quote id=${id}`);
    }

    const quote = (model.quote = apiResult.quote);

    const authorDisplayName = (model.authorDisplayName = getPersonDisplayName(
      quote.author.name,
      lang
    ));

    head.title = `${authorDisplayName}: ${truncateAt(quote.text, 80)}`;
    head.description = `${authorDisplayName}: ${truncateAt(quote.text, 120)}`;

    this.setCanonical(links.news.quote(id, { ul: lang }));

    this.apiClient.quotesLatestByAuthor(
      "byQuotes",
      { fields: QuoteStringFields },
      { params: { country, lang, limit: 3, authorId: quote.author.id } }
    );

    if (quote.events && quote.events.length) {
      this.apiClient.newsEventById(
        "event",
        { fields: LIST_EVENTS_FIEDLS },
        { id: quote.events[quote.events.length - 1].id }
      );
    }
    return super.build();
  }
}

export interface QuoteViewModelInput extends OurnetViewModelInput {
  id: string;
}

export interface QuoteViewModel extends NewsViewModel {
  quote: Quote;
  byQuotes: Quote[];
  event?: NewsEvent;
  authorDisplayName: string;
}
