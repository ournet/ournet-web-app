
import { NewsViewModelBuilder, NewsViewModel } from "./news-view-model";
import { NewsEventStringFields, QuoteStringFields, NewsEvent, Quote } from "@ournet/api-client";
import { OurnetViewModelInput } from "../../ournet/view-model";


export class IndexViewModelBuilder<T extends IndexViewModel, I extends OurnetViewModelInput>
    extends NewsViewModelBuilder<T, I> {

    build() {

        const { lang, links, country } = this.model;

        // head.title = translate(LocalesNames.site_title), LocalesHelper.getCountryName(__, country));
        // head.description = translate(LocalesNames.site_description), LocalesHelper.getInCountryName(__, country));

        this.setCanonical(links.news.home({ ul: lang }));

        this.apiClient.newsEventsLatest('latestEvents', { fields: NewsEventStringFields }, { params: { lang, country, limit: 14 } })
            .quotesLatest('latestQuotes', { fields: QuoteStringFields }, { params: { lang, country, limit: 6 } });

        return super.build();
    }
}

export interface IndexViewModel extends NewsViewModel {
    latestEvents: NewsEvent[]
    latestQuotes: Quote[]
}

