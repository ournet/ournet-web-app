import { WeatherBaseHandler } from "./handler";
import { WeatherAppData } from "../data";
import {
  PlacesDailyForecastViewModelBuilder,
  PlacesDailyForecastViewModelInput
} from "../view-models/places-daily-forecast-model";
import { PlacesDailyForecast } from "../views/components/forecast/places-daily-forecast";
import logger from "../../logger";

export class PlacesDailyForecastHandler extends WeatherBaseHandler<PlacesDailyForecastViewModelInput> {
  async handle(data: WeatherAppData) {
    try {
      const viewData = await new PlacesDailyForecastViewModelBuilder(
        this.input,
        data
      ).build();

      this.setCacheControl(60 * 2);
      return this.render(PlacesDailyForecast(viewData));
    } catch (e) {
      logger.error(e);
      this.setCacheControl(1 / 2);
      return this.send("", 200);
    }
  }
}
