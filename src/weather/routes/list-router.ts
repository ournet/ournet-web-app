import { Request, Response } from "../../base/types";
import { WeatherBaseRouter } from "../router";
import { ListViewModelInput } from "../view-models/list-view-model";
import { WEATHER_GLOBAL_CONFIG_LIST_IDS } from "../config";
import { ListHandler } from "../handlers/list-handler";

interface ListRouterData extends WeatherBaseRouter {
  listId: string;
}

export class ListRouter extends WeatherBaseRouter<ListRouterData> {
  constructor() {
    super(`/(${WEATHER_GLOBAL_CONFIG_LIST_IDS.join("|")})`, ["listId"]);
  }

  protected createHander(req: Request, res: Response, data: ListRouterData) {
    const input = this.formatInput<ListViewModelInput>(req, res);
    input.listId = data.listId;
    return new ListHandler(input);
  }
}
