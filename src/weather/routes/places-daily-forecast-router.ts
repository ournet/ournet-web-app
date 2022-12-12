import { Request, Response } from "../../base/types";
import { WeatherBaseRouter } from "../router";
import { PlacesDailyForecastHandler } from "../handlers/places-daily-forecast-handler";
import { PlacesDailyForecastViewModelInput } from "../view-models/places-daily-forecast-model";

type PlacesDailyForecastRouterData = {
  date: string;
  ids: string[];
};

export class PlacesDailyForecastRouter extends WeatherBaseRouter<PlacesDailyForecastRouterData> {
  constructor() {
    super("/controls/places-daily-forecast/(\\d{4}-\\d{2}-\\d{2})/([^/]+)", [
      "date",
      "ids"
    ]);
  }

  protected createHander(
    req: Request,
    res: Response,
    data: PlacesDailyForecastRouterData
  ) {
    const input = this.formatInput<PlacesDailyForecastViewModelInput>(req, res);
    input.ids = data.ids;
    input.date = data.date;
    return new PlacesDailyForecastHandler(input);
  }

  protected formatData(data: PlacesDailyForecastRouterData) {
    data.ids = ((<any>data.ids) as string).split(/[,;]+/g);

    return data;
  }
}
