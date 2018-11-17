
import { IPortalAppConfig } from "../config";
import { PageViewModelBuilder, PageViewModel } from "../../ournet/page-view-model";
import { IPortalAppData } from "../data";
import moment = require("moment-timezone");
import { Topic, Place, HourlyForecastDataPoint, NewsTopItem, NewsTopItemStringFields, HourlyForecastDataPointStringFields, TopicStringFields } from "@ournet/api-client";
import logger from "../../logger";
import { OurnetViewModelInput } from "../../ournet/view-model";
import { filterIrrelevantTopics } from "../../news/irrelevant-topics";


export class PortalViewModelBuilder<T extends PortalViewModel, I extends OurnetViewModelInput>
    extends PageViewModelBuilder<IPortalAppData, IPortalAppConfig, T, I> {

    constructor(input: I, data: IPortalAppData) {
        super(input, data);

        const model = this.model;

        model.currentDate = moment().tz(model.config.timezone).locale(model.lang);
    }

    async build() {
        const localApiClient = this.data.createQueryApiClient<{ capital: Place, trendingTopics: NewsTopItem[] }>();

        const model = this.model;
        const { country, lang } = model;

        const result = await localApiClient
            .placesPlaceById('capital', { fields: 'id name names longitude latitude timezone' },
                { id: model.config.capitalId })
            .newsTrendingTopics('trendingTopics', { fields: NewsTopItemStringFields }, { params: { country, lang, limit: 20, period: '24h' } })
            .execute();

        if (result.errors && result.errors.length) {
            logger.error(result.errors[0]);
        }

        if (result.data) {
            if (result.data.capital) {
                model.capital = result.data.capital;

                const { longitude,
                    latitude,
                    timezone, } = model.capital;

                this.apiClient.weatherNowPlaceForecast('capitalForecast', { fields: HourlyForecastDataPointStringFields },
                    { place: { longitude, latitude, timezone } });
            }

            const trendingTopTopics = filterIrrelevantTopics({ lang, country }, result.data.trendingTopics || []).slice(0, 12);

            if (trendingTopTopics.length) {
                this.apiClient.topicsTopicsByIds('trendingTopics', { fields: TopicStringFields },
                    { ids: trendingTopTopics.map(item => item.id) });
            }
        }

        return super.build();
    }
}

export interface PortalViewModel extends PageViewModel<IPortalAppConfig> {
    currentDate: moment.Moment
    capital: Place
    capitalForecast: HourlyForecastDataPoint
    trendingTopics: TrendingTopic[]

    title: string
    subTitle: string
}

export interface TrendingTopic extends Topic {
    count: number
}
