
import { PortalViewModelBuilder, PortalViewModel } from "./portal-view-model";
import { NewsEventStringFields, QuoteStringFields, NewsEvent, Quote } from "@ournet/api-client";
import { OurnetViewModelInput } from "../../ournet/view-model";


export class IndexViewModelBuilder<T extends IndexViewModel, I extends OurnetViewModelInput>
    extends PortalViewModelBuilder<T, I> {

    build() {

        const { lang, links, country, locales, head } = this.model;

        head.title = locales.portal_site_title_format({ country: locales.getCountryName(country) });
        head.description = locales.portal_site_description_format({ country: locales.getInCountryName(country) });

        this.setCanonical(links.portal.home({ ul: lang }));

        this.apiClient.newsEventsLatest('latestEvents', { fields: NewsEventStringFields }, { params: { lang, country, limit: 14 } })
            .quotesLatest('latestQuotes', { fields: QuoteStringFields }, { params: { lang, country, limit: 6 } });

        return super.build();
    }
}

export interface IndexViewModel extends PortalViewModel {
    latestEvents: NewsEvent[]
    latestQuotes: Quote[]
}

