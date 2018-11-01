import { Request, Response } from "../../base/types";
import { HoroscopeBaseRouter } from "../router";
import { ApiHandler } from "../handlers/api.handler";

export class ApiRouter extends HoroscopeBaseRouter {
    constructor() {
        super('/api')
    }

    protected createHander(req: Request, res: Response) {
        return new ApiHandler(this.formatInput(req, res));
    }
}
