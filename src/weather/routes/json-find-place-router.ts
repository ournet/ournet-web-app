import { Request, Response } from "../../base/types";
import { WeatherBaseRouter } from "../router";
import { JsonFindPlaceHandler, JsonFindPlaceViewModelInput } from "../handlers/json-find-place-handler";

export class JsonFindPlaceRouter extends WeatherBaseRouter {
    constructor() {
        super('/json/find_place')
    }

    protected createHander(req: Request, res: Response) {
        const input = this.formatInput<JsonFindPlaceViewModelInput>(req, res);
        input.q = input.url.query.q as string;
        return new JsonFindPlaceHandler(input);
    }
}
