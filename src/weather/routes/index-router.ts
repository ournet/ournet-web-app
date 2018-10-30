import { Request, Response } from "../../base/types";
import { WeatherBaseRouter } from "../router";
import { IndexHandler } from "../handlers/index-handler";

export class IndexRouter extends WeatherBaseRouter {
    constructor() {
        super('/')
    }

    protected createHander(req: Request, res: Response) {
        return new IndexHandler(this.formatInput(req, res));
    }
}
