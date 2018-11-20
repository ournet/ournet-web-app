import { OurnetRouter } from "../router";
import { Request, Response } from "../../base/types";
import { Handler } from "../../base/handler";
import { OurnetAppData } from "../data";
import { OurnetViewModelInput } from "../view-model";
import { createAppConfig } from "../config";
import { getAppIconUrl } from "../../helpers";


export class FaviconRouter extends OurnetRouter {
    constructor() {
        super('/favicon.ico');
    }
    protected createHander(req: Request, res: Response) {
        return new FaviconHandler(this.formatInput(req, res));
    }
}

class FaviconHandler extends Handler<OurnetAppData, OurnetViewModelInput> {
    handle() {
        this.setCacheControl(60 * 24 * 30);

        const data = createAppConfig(this.input.project, this.input.country);

        const url = getAppIconUrl(data.domain, 'favicon.ico');

        return this.redirect(url, 301);
    }
}
