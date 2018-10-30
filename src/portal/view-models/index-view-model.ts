
import { PortalViewModelBuilder, PortalViewModel } from "./portal-view-model";
import { NewsEventStringFields, QuoteStringFields, NewsEvent, Quote } from "@ournet/api-client";
import { OurnetViewModelInput } from "../../ournet/view-model";
import { PortalLocaleNames } from "../locale";
import { LocaleHelpers } from "../../ournet/locale";


export class IndexViewModelBuilder<T extends IndexViewModel, I extends OurnetViewModelInput>
    extends PortalViewModelBuilder<T, I> {

    build() {

        const { lang, links, country, translate, head } = this.model;

        head.title = translate(PortalLocaleNames.site_title, { country: LocaleHelpers.getCountryName(translate, country) });
        head.description = translate(PortalLocaleNames.site_description, { country: LocaleHelpers.getInCountryName(translate, country) });

        this.setCanonical(links.news.home({ ul: lang }));

        this.apiClient.newsEventsLatest('latestEvents', { fields: NewsEventStringFields }, { params: { lang, country, limit: 14 } })
            .quotesLatest('latestQuotes', { fields: QuoteStringFields }, { params: { lang, country, limit: 6 } });

        return super.build();
    }
}

export interface IndexViewModel extends PortalViewModel {
    latestEvents: NewsEvent[]
    latestQuotes: Quote[]
}

