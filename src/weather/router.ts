import { OurnetRouter } from "../ournet/router";
import { getLanguageFromQueryString } from "../ournet/view-model";
import { OurnetAppConfig } from "../ournet/config";
import { ParsedUrlQuery } from "querystring";

export interface WeatherBaseRouterData {
  // ul: string
}

export abstract class WeatherBaseRouter<
  DATA extends WeatherBaseRouterData = WeatherBaseRouterData
> extends OurnetRouter<DATA> {
  protected getLanguage(config: OurnetAppConfig, query: ParsedUrlQuery) {
    return getLanguageFromQueryString(config, query);
  }
}
