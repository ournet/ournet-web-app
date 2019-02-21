import { Request, Response } from "../../base/types";
import { WeatherBaseRouter, WeatherBaseRouterData } from "../router";
import { PlaceHandler } from "../handlers/place-handler";
import { PlaceViewModelInput } from "../view-models/place-view-model";

interface PlaceRouterData extends WeatherBaseRouterData {
    id: string
}

export class PlaceRouter extends WeatherBaseRouter<PlaceRouterData> {
    constructor() {
        super(`/(\\d+)`, ['id'])
    }

    protected createHander(req: Request, res: Response, data: PlaceRouterData) {
        const input = this.formatInput<PlaceViewModelInput>(req, res);
        input.id = data.id;
        return new PlaceHandler(input);
    }
}
