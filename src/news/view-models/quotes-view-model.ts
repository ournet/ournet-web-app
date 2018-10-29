
import { NewsViewModelBuilder, NewsViewModel } from "./news-view-model";
import { NewsEventStringFields, QuoteStringFields, NewsEvent, Quote } from "@ournet/api-client";
import { OurnetViewModelInput } from "../../ournet/view-model";
import { NewsLocaleNames } from "../locale";
import { LocaleHelpers } from "../../ournet/locale";


export class QuotesViewModelBuilder<T extends QuotesViewModel, I extends OurnetViewModelInput>
    extends NewsViewModelBuilder<T, I> {

    build() {

        const model = this.model;
        const { lang, links, translate, head, country } = model;

        head.title = translate(NewsLocaleNames.latest_quotes_in_media);
        head.description = translate(NewsLocaleNames.latest_quotes_in_media_country_format, { country: LocaleHelpers.getCountryName(translate, country) });

        model.title = translate(NewsLocaleNames.latest_quotes);

        this.setCanonical(links.news.quotes({ ul: lang }));

        this.apiClient.newsEventsLatest('latestEvents', { fields: NewsEventStringFields }, { params: { lang, country, limit: 4 } })
            .quotesLatest('latestQuotes', { fields: QuoteStringFields }, { params: { lang, country, limit: 12 } });

        return super.build();
    }
}

export interface QuotesViewModel extends NewsViewModel {
    latestEvents: NewsEvent[]
    latestQuotes: Quote[]
}

