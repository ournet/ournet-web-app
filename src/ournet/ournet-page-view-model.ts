import { OurnetAppConfig } from "./config";
import { OurnetAppData, OurnetProjectName } from "./data";
import { OurnetViewModelInput } from "./view-model";
import { PageViewModel, PageViewModelBuilder } from "./page-view-model";
import {
  Article,
  ArticleStatus,
  HourlyForecastDataPoint,
  HourlyForecastDataPointStringFields,
  NewsTopItem,
  NewsTopItemStringFields,
  Place,
  TopicStringFields
} from "@ournet/api-client";
import { TrendingTopic } from "../news/view-models/news-view-model";
import moment = require("moment");
import logger from "../logger";
import { filterIrrelevantTopics } from "../news/irrelevant-topics";
import { LIST_ARTICLES_FIEDLS } from "../news/config";

export abstract class OurnetPageViewModelBuilder<
  DATA extends OurnetAppData,
  CONFIG extends OurnetAppConfig,
  T extends OurnetPageViewModel<CONFIG>,
  I extends OurnetViewModelInput
> extends PageViewModelBuilder<DATA, CONFIG, T, I> {
  constructor(input: I, data: DATA) {
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

    localApiClient.placesPlaceById(
      "capital",
      { fields: "id name names longitude latitude timezone" },
      { id: model.config.capitalId }
    );

    if (this.model.containsProject(OurnetProjectName.NEWS)) {
      localApiClient.newsTrendingTopics(
        "trendingTopics",
        { fields: NewsTopItemStringFields },
        { params: { country, lang, limit: 20, period: "24h" } }
      );

      this.apiClient.findArticle(
        "latestArticles",
        { fields: LIST_ARTICLES_FIEDLS },
        { lang, country, status: ArticleStatus.ACTIVE, limit: 4 }
      );
    }

    const result = await localApiClient.queryExecute();

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
}

export interface OurnetPageViewModel<CONFIG extends OurnetAppConfig>
  extends PageViewModel<CONFIG> {
  currentDate: moment.Moment;
  capital: Place;
  capitalForecast: HourlyForecastDataPoint;
  trendingTopics: TrendingTopic[];

  title: string;
  subTitle: string;
  latestArticles: Article[];
}
