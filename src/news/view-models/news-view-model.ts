import { NewsAppConfig } from "../config";
import { Topic } from "@ournet/api-client";
import { OurnetViewModelInput } from "../../ournet/view-model";
import { NewsAppData } from "../data";
import {
  OurnetPageViewModel,
  OurnetPageViewModelBuilder
} from "../../ournet/ournet-page-view-model";

export class NewsViewModelBuilder<
  T extends NewsViewModel,
  I extends OurnetViewModelInput
> extends OurnetPageViewModelBuilder<NewsAppData, NewsAppConfig, T, I> {
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

export interface NewsViewModel extends OurnetPageViewModel<NewsAppConfig> {}

export interface TrendingTopic extends Topic {
  count: number;
}
