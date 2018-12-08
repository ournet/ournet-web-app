
import { NewsViewModelBuilder, NewsViewModel } from "./news-view-model";
import { QuoteStringFields, NewsEvent, Quote } from "@ournet/api-client";
import { OurnetViewModelInput } from "../../ournet/view-model";
import { LIST_EVENTS_FIEDLS } from "../config";


export class IndexViewModelBuilder<T extends IndexViewModel, I extends OurnetViewModelInput>
    extends NewsViewModelBuilder<T, I> {

    build() {

        const { lang, links, country, locales, head } = this.model;

        head.title = locales.news_site_title_format({ country: locales.getCountryName(country) });
        head.description = locales.news_site_description_format({ country: locales.getInCountryName(country) });

        this.setCanonical(links.news.home({ ul: lang }));

        this.apiClient.newsEventsLatest('latestEvents', { fields: LIST_EVENTS_FIEDLS }, { params: { lang, country, limit: 14 } })
            .quotesLatest('latestQuotes', { fields: QuoteStringFields }, { params: { lang, country, limit: 6 } });

        return super.build();
    }
}

export interface IndexViewModel extends NewsViewModel {
    latestEvents: NewsEvent[]
    latestQuotes: Quote[]
}

