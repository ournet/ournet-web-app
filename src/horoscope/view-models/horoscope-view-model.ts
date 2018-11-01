
import { HoroscopeAppConfig } from "../config";
import { PageViewModelBuilder, PageViewModel } from "../../ournet/page-view-model";
import { HoroscopeAppData } from "../data";
import moment = require("moment-timezone");
import { Place, HourlyForecastDataPoint, HourlyForecastDataPointStringFields, NewsEvent, NewsEventStringFields } from "@ournet/api-client";
import logger from "../../logger";
import { OurnetViewModelInput } from "../../ournet/view-model";
import { HoroscopeLocaleNames } from "../locale";


export class HoroscopeViewModelBuilder<T extends HoroscopeViewModel, I extends OurnetViewModelInput>
    extends PageViewModelBuilder<HoroscopeAppData, HoroscopeAppConfig, T, I> {

    constructor(input: I, data: HoroscopeAppData) {
        super(input, data);

        const model = this.model;
        const { lang, translate } = model;
        const currentDate = model.currentDate = moment().tz(model.config.timezone).locale(lang);

        model.currentDayPeriod = 'D' + currentDate.format('YYYYMMDD');
        model.currentWeekPeriod = 'W' + currentDate.format('YYYYWW');

        const weekStartDate = currentDate.clone().isoWeekday(1).locale(lang);
        const weekEndDate = currentDate.clone().isoWeekday(7).locale(lang);

        model.currentDayPeriodText = currentDate.format(translate(HoroscopeLocaleNames.day_format));
        model.currentWeekPeriodText = weekStartDate.format('D MMM') + ' - ' + weekEndDate.format('D MMMM YYYY');
    }

    async build() {
        const localApiClient = this.data.createQueryApiClient<{ capital: Place }>();

        const model = this.model;

        const { lang, country } = model;

        const result = await localApiClient
            .placesPlaceById('capital', { fields: 'id name names longitude latitude timezone' },
                { id: model.config.capitalId })
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
        }

        this.apiClient.newsEventsLatest('latestNews', { fields: NewsEventStringFields }, { params: { country, lang, limit: 4 } });

        return super.build();
    }
}

export interface HoroscopeViewModel extends PageViewModel<HoroscopeAppConfig> {
    currentDate: moment.Moment
    capital: Place
    capitalForecast: HourlyForecastDataPoint
    latestNews: NewsEvent[]

    currentDayPeriod: string
    currentWeekPeriod: string
    currentDayPeriodText: string
    currentWeekPeriodText: string

    title: string
    subTitle: string
}

