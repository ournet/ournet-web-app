import { Request, Response } from "../../base/types";
import { WeatherBaseRouter, WeatherBaseRouterData } from "../router";
import { CountryHandler } from "../handlers/country-handler";
import { CountryViewModelInput } from "../view-models/country-view-model";

interface RouterData extends WeatherBaseRouterData {
  countryCode: string;
}

export class CountryRouter extends WeatherBaseRouter<RouterData> {
  constructor() {
    super("/([a-z]{2})", ["countryCode"]);
  }

  protected createHander(req: Request, res: Response, data: RouterData) {
    const input = this.formatInput<CountryViewModelInput>(req, res);
    input.countryCode = data.countryCode;
    return new CountryHandler(input);
  }
}
