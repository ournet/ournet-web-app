
import { WeatherAppConfig } from "../config";
import { PageViewModelBuilder, PageViewModel } from "../../ournet/page-view-model";
import { WeatherAppData, PlaceNoAdmin1Fields } from "../data";
import moment = require("moment-timezone");
import { Place, HourlyForecastDataPoint, HourlyForecastDataPointStringFields, NewsEvent } from "@ournet/api-client";
import logger from "../../logger";
import { OurnetViewModelInput, getLanguageFromQueryString } from "../../ournet/view-model";
import { LIST_EVENTS_FIEDLS } from "../../news/config";


export class WeatherViewModelBuilder<T extends WeatherViewModel, I extends OurnetViewModelInput=OurnetViewModelInput>
    extends PageViewModelBuilder<WeatherAppData, WeatherAppConfig, T, I> {

    constructor(input: I, data: WeatherAppData) {
        super(input, data);

        const model = this.model;

        model.currentDate = moment().tz(model.config.timezone).locale(model.lang);
    }

    async build() {
        const localApiClient = this.data.createQueryApiClient<{ capital: Place }>();

        const model = this.model;

        const { country, lang } = model;

        const result = await localApiClient
            .placesPlaceById('capital', { fields: 'id name names longitude latitude timezone' },
                { id: model.config.capitalId })
            .queryExecute();

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

        this.apiClient.placesMainPlaces('mainPlaces', { fields: PlaceNoAdmin1Fields }, { country, limit: 20 })
            .newsEventsLatest('latestNews', { fields: LIST_EVENTS_FIEDLS }, { params: { country, lang, limit: 4 } });

        return super.build();
    }

    protected getLanguage(config: WeatherAppConfig) {
        return getLanguageFromQueryString(config, this.input.url.query);
    }
}

export interface WeatherViewModel extends PageViewModel<WeatherAppConfig> {
    currentDate: moment.Moment
    capital: Place
    capitalForecast: HourlyForecastDataPoint
    mainPlaces: Place[]
    latestNews: NewsEvent[]

    title: string
    subTitle: string
}

