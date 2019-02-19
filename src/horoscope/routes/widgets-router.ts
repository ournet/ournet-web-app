import { Request, Response } from "../../base/types";
import { HoroscopeBaseRouter, HoroscopeBaseRouterData } from "../router";
import { WidgetsHandler } from "../handlers/widgets-handler";


export class WidgetsRouter extends HoroscopeBaseRouter<HoroscopeBaseRouterData> {
    constructor() {
        super('/widgets')
    }

    protected createHander(req: Request, res: Response) {
        const input = this.formatInput(req, res);
        return new WidgetsHandler(input);
    }
}
