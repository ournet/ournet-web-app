import {
  Place,
  DailyForecastDataBlock,
  ForecastReportStringFields,
  ForecastReport
} from "@ournet/api-client";
import { notFound } from "boom";
import {
  OurnetViewModelInput,
  getLanguageFromQueryString
} from "../../ournet/view-model";
import {
  PageViewModel,
  PageViewModelBuilder
} from "../../ournet/page-view-model";
import { WeatherAppConfig } from "../config";
import { WeatherAppData, PlaceNoAdmin1Fields } from "../data";
import coinWebData, { CoinWebDataFetchData } from "../../coin-web-data";

export interface Widget1ViewModelInput extends OurnetViewModelInput {
  id: string;
  days: number;
  w: number;
  bcolor?: string;
  bkcolor?: string;
  hbkcolor?: string;
  htcolor?: string;
  lcolor?: string;
  textcolor?: string;
}

export interface Widget1ViewModel extends PageViewModel<WeatherAppConfig> {
  place: Place;
  forecast: ForecastReport;
  report: DailyForecastDataBlock;

  days: number;
  w: number;
  bcolor: string;
  bkcolor: string;
  hbkcolor: string;
  htcolor: string;
  lcolor: string;
  textcolor: string;

  webDataFetch?: CoinWebDataFetchData;
}

export class Widget1ViewModelBuilder extends PageViewModelBuilder<
  WeatherAppData,
  WeatherAppConfig,
  Widget1ViewModel,
  Widget1ViewModelInput
> {
  async build() {
    this.model.textcolor = this.input.textcolor || "848484";
    this.model.bcolor = this.input.bcolor || "CA0000";
    this.model.bkcolor = this.input.bkcolor || "FFF";
    this.model.hbkcolor = this.input.hbkcolor || "CA0000";
    this.model.htcolor = this.input.htcolor || "FFF";
    this.model.lcolor = this.input.lcolor || "DDD";
    this.model.days = this.input.days;
    this.model.w = this.input.w;

    if (isNaN(this.model.days) || this.model.days < 1 || this.model.days > 9) {
      this.model.days = 5;
    }
    if (isNaN(this.model.w) || this.model.w < 50) {
      this.model.w = 200;
    }

    const localApi = this.data.createQueryApiClient<{ place: Place }>();
    const [result, webDataFetch] = await Promise.all([
      localApi
        .placesPlaceById(
          "place",
          { fields: PlaceNoAdmin1Fields },
          { id: this.input.id.trim() }
        )
        .queryExecute(),
      coinWebData.fetchData()
    ]);
    if (!result.data || !result.data.place) {
      throw notFound(`Not found place id=${this.input.id}`);
    }
    const place = (this.model.place = result.data.place);

    if (webDataFetch) this.model.webDataFetch = webDataFetch;

    this.apiClient.weatherForecastReport(
      "forecast",
      { fields: ForecastReportStringFields },
      {
        place: {
          timezone: place.timezone,
          latitude: place.latitude,
          longitude: place.longitude
        }
      }
    );

    return super.build();
  }

  protected formatModelData(data: Widget1ViewModel) {
    const model = super.formatModelData(data);
    const { forecast } = model;
    if (forecast && forecast.daily) {
      model.report = forecast.daily;
    }

    return model;
  }

  protected getLanguage(config: WeatherAppConfig): string {
    return getLanguageFromQueryString(config, this.input.url.query);
  }
}
