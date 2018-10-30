
import { WeatherBaseHandler } from "./handler";
import { WeatherAppData } from "../data";
import { PlacesDailyForecastViewModelBuilder, PlacesDailyForecastViewModelInput } from '../view-models/places-daily-forecast-model';
import { PlacesDailyForecast } from "../views/components/forecast/places-daily-forecast";

export class PlacesDailyForecastHandler extends WeatherBaseHandler<PlacesDailyForecastViewModelInput> {
    async handle(data: WeatherAppData) {
        const viewData = await new PlacesDailyForecastViewModelBuilder(this.input, data).build();
        const res = this.input.res;

        this.setCacheControl(res, 60 * 2);
        return this.render(res, PlacesDailyForecast(viewData));
    }
}
