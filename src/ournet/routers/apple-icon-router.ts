import { OurnetRouter } from "../router";
import { Request, Response } from "../../base/types";
import { Handler } from "../../base/handler";
import { IOurnetAppData } from "../data";
import { OurnetViewModelInput } from "../view-model";
import { createAppConfig } from "../config";
import { getAppIconUrl } from "../../helpers";


export class AppleIconRouter extends OurnetRouter {
    constructor() {
        super('/apple-touch-icon.png');
    }
    protected createHander(req: Request, res: Response) {
        return new AppleIconHandler(this.formatInput(req, res));
    }
}

class AppleIconHandler extends Handler<IOurnetAppData, OurnetViewModelInput> {
    handle() {

        this.setCacheControl(60 * 24 * 30);

        const data = createAppConfig(this.input.project, this.input.country);

        const url = getAppIconUrl(data.domain, 'apple-touch-icon.png');

        return this.redirect(url, 301);
    }
}
