import { Request, Response } from "../../base/types";
import { WeatherBaseRouter } from "../router";
import { PlacesHandler } from "../handlers/places-handler";
import { PlacesViewModelInput } from "../view-models/places-view-model";


export class PlacesRouter extends WeatherBaseRouter {
    constructor() {
        super(`/places`)
    }

    protected createHander(req: Request, res: Response) {
        const input = this.formatInput<PlacesViewModelInput>(req, res);
        input.q = input.url.query.q as string;
        return new PlacesHandler(input);
    }
}

interface PlacesAdmin1RouterData extends WeatherBaseRouter {
    admin1Code: string
}

export class PlacesAdmin1Router extends WeatherBaseRouter<PlacesAdmin1RouterData> {
    constructor() {
        super(`/places/([^/]+)`, ['admin1Code'])
    }

    protected createHander(req: Request, res: Response, data: PlacesAdmin1RouterData) {
        const input = this.formatInput<PlacesViewModelInput>(req, res);
        input.q = input.url.query.q as string;
        input.admin1Code = data.admin1Code;

        return new PlacesHandler(input);
    }
}

