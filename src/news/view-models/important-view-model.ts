
import { NewsViewModelBuilder, NewsViewModel } from "./news-view-model";
import { NewsEventStringFields, QuoteStringFields, NewsEvent, Quote } from "@ournet/api-client";
import { OurnetViewModelInput } from "../../ournet/view-model";
import { Moment } from "moment-timezone";
import { Dictionary, uniq } from "@ournet/domain";


export class ImportantViewModelBuilder extends NewsViewModelBuilder<ImportantViewModel, OurnetViewModelInput> {

    async build() {

        const { lang, links, locales, head, country, currentDate } = this.model;

        head.title = locales.important_news();
        head.description = locales.most_important_news_in_last_7days_country_format({ country: locales.getCountryName(country) });

        this.setCanonical(links.news.important({ ul: lang }));

        const ids = await this.getImportantEventsIds({ limit: 12, lang, country, currentDate });

        if (ids.length) {
            this.apiClient.newsEventsByIds('importantEvents', { fields: NewsEventStringFields }, { ids })
                .quotesLatest('latestQuotes', { fields: QuoteStringFields }, { params: { lang, country, limit: 6 } });
        }

        return super.build();
    }

    async getImportantEventsIds(data: { limit: number, lang: string, country: string, currentDate: Moment }) {
        const { lang, country, currentDate, limit } = data;

        const maxDate = currentDate.clone().add(1, 'day');
        const minDate = currentDate.clone();

        const apiClient = this.data.createQueryApiClient<Dictionary<NewsEvent[]>>();

        const countDays = 7;
        for (let i = 0; i < countDays; i++) {
            apiClient.newsEventsLatest(`day${i}`, { fields: 'id countNews' }, { params: { limit: 100, lang, country, maxDate: maxDate.format('YYYY-MM-DD'), minDate: minDate.format('YYYY-MM-DD') } })
            maxDate.add(-1, 'day');
            minDate.add(-1, 'day');
        }

        const result = await this.executeApiClient(apiClient);

        const allEvents: NewsEvent[] = Object.keys(result).reduce<NewsEvent[]>((list, key) => list.concat(result[key]), []);

        const mostPopularIds = uniq(allEvents.sort((a, b) => b.countNews - a.countNews).map(item => item.id)).slice(0, limit);

        return mostPopularIds;
    }

    protected formatModelData(data: ImportantViewModel) {

        const model = super.formatModelData(data);

        model.importantEvents = (data.importantEvents || []).sort((a, b) => {
            const aDate = a.createdAt.substr(0, 10);
            const bDate = b.createdAt.substr(0, 10);
            if (aDate === bDate) {
                return b.countNews - a.countNews;
            }
            if (aDate < bDate) {
                return 1;
            }
            return -1;
        });

        return model;
    }
}

export interface ImportantViewModel extends NewsViewModel {
    importantEvents: NewsEvent[]
    latestQuotes: Quote[]
}
