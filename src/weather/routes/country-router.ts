import { Request, Response } from "../../base/types";
import { WeatherBaseRouter, WeatherBaseRouterData } from "../router";
import { IndexHandler } from "../handlers/index-handler";

interface RouterData extends WeatherBaseRouterData {
  country: string;
}

export class CountryRouter extends WeatherBaseRouter<RouterData> {
  constructor() {
    super("/[a-z]{2}", ["country"]);
  }

  protected createHander(req: Request, res: Response) {
    return new IndexHandler(this.formatInput(req, res));
  }
}
