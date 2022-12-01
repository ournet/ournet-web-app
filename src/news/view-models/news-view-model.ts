import { NewsAppConfig } from "../config";
import {
  PageViewModelBuilder,
  PageViewModel
} from "../../ournet/page-view-model";
import { NewsAppData } from "../data";
import moment = require("moment-timezone");
import {
  Topic,
  Place,
  HourlyForecastDataPoint,
  NewsTopItem,
  NewsTopItemStringFields,
  HourlyForecastDataPointStringFields,
  TopicStringFields
} from "@ournet/api-client";
import logger from "../../logger";
import { filterIrrelevantTopics } from "../irrelevant-topics";
import { OurnetViewModelInput } from "../../ournet/view-model";

export class NewsViewModelBuilder<
  T extends NewsViewModel,
  I extends OurnetViewModelInput
> extends PageViewModelBuilder<NewsAppData, NewsAppConfig, T, I> {
  constructor(input: I, data: NewsAppData) {
    super(input, data);

    const model = this.model;

    model.currentDate = moment().tz(model.config.timezone).locale(model.lang);
  }

  async build() {
    const localApiClient = this.data.createQueryApiClient<{
      capital: Place;
      trendingTopics: NewsTopItem[];
    }>();

    const model = this.model;
    const { country, lang } = model;

    const result = await localApiClient
      .placesPlaceById(
        "capital",
        { fields: "id name names longitude latitude timezone" },
        { id: model.config.capitalId }
      )
      .newsTrendingTopics(
        "trendingTopics",
        { fields: NewsTopItemStringFields },
        { params: { country, lang, limit: 20, period: "24h" } }
      )
      .queryExecute();

    if (result.errors && result.errors.length) {
      logger.error(result.errors[0]);
    }

    if (result.data) {
      if (result.data.capital) {
        model.capital = result.data.capital;

        const { longitude, latitude, timezone } = model.capital;

        this.apiClient.weatherNowPlaceForecast(
          "capitalForecast",
          { fields: HourlyForecastDataPointStringFields },
          { place: { longitude, latitude, timezone } }
        );
      }

      const trendingTopTopics = filterIrrelevantTopics(
        { lang, country },
        result.data.trendingTopics || []
      ).slice(0, 15);

      if (trendingTopTopics.length) {
        this.apiClient.topicsTopicsByIds(
          "trendingTopics",
          { fields: TopicStringFields },
          { ids: trendingTopTopics.map((item) => item.id) }
        );
      }
    }

    return super.build();
  }

  protected getLanguage(config: NewsAppConfig) {
    const regResult = /^\/([a-z]{2})\//.exec(this.input.url.pathname || "");
    let lang = this.input.url.query["ul"] as string;
    if (regResult) {
      lang = regResult[1];
    }
    if (lang && config.languages.includes(lang)) {
      return lang;
    }

    return config.languages[0];
  }
}

export interface NewsViewModel extends PageViewModel<NewsAppConfig> {
  currentDate: moment.Moment;
  capital: Place;
  capitalForecast: HourlyForecastDataPoint;
  trendingTopics: TrendingTopic[];

  title: string;
  subTitle: string;
}

export interface TrendingTopic extends Topic {
  count: number;
}
