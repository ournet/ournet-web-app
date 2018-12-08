
import {
    Place, DailyForecastDataPointStringFields, DailyForecastDataPoint,
} from "@ournet/api-client";
import { OurnetViewModelInput } from "../../ournet/view-model";
import { WeatherViewModelBuilder, WeatherViewModel } from "./weather-view-model";

export class PlacesDailyForecastViewModelBuilder extends WeatherViewModelBuilder<PlacesDailyForecastViewModel, PlacesDailyForecastViewModelInput> {
    async build() {
        const localApiClient = this.data.createQueryApiClient<{ places: Place[] }>();

        const result = await localApiClient
            .placesPlacesByIds('places', { fields: 'id name names longitude latitude timezone' }, { ids: this.input.ids })
            .queryExecute();

        if (result.data && result.data.places) {
            const places = this.model.places = result.data.places;

            const placesData = places.map(place => ({
                longitude: place.longitude,
                latitude: place.latitude,
                timezone: place.timezone,
            }));

            this.apiClient.weatherDatePlacesForecast('data'
                , { fields: DailyForecastDataPointStringFields }
                , { places: placesData, date: this.input.date });
        }

        return super.build();
    }

    protected formatModelData(data: PlacesDailyForecastViewModel) {
        const model = super.formatModelData(data);
        model.reports = [];

        data.data && data.data.forEach((report, index) => {
            if (report) {
                model.reports.push({
                    place: model.places[index],
                    forecast: report,
                })
            }
        })

        return model;
    }
}

export type PlaceDailyForecast = {
    place: Place
    forecast: DailyForecastDataPoint
}

export interface PlacesDailyForecastViewModel extends WeatherViewModel {
    data: DailyForecastDataPoint[]
    places: Place[]
    reports: PlaceDailyForecast[]
}

export interface PlacesDailyForecastViewModelInput extends OurnetViewModelInput {
    ids: string[]
    date: string
}
