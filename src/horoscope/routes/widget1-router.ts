import { Request, Response } from "../../base/types";
import { HoroscopeBaseRouter, HoroscopeBaseRouterData } from "../router";
import { Widget1Handler } from "../handlers/widget1-handler";


export class Widget1Router extends HoroscopeBaseRouter<HoroscopeBaseRouterData> {
    constructor() {
        super('/widget/widget1_frame')
    }

    protected createHander(req: Request, res: Response) {
        const input = this.formatInput(req, res);
        return new Widget1Handler(input);
    }
}
