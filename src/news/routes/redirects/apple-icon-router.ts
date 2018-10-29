import { NewsBaseRouter } from "../../router";
import { Request, Response } from "../../../base/types";
import { NewsBaseHandler } from "../../handlers/handler";
import { getFaviconUrl } from "../../../helpers";
import { createAppConfig } from "../../../ournet/config";
import { OurnetProjectName } from "../../../ournet/data";

export class AppleIconRouter extends NewsBaseRouter {
    constructor() {
        super('/apple-touch-icon.png');
    }
    protected createHander(req: Request, res: Response) {
        return new Handler(this.formatInput(req, res));
    }
}

class Handler extends NewsBaseHandler {
    handle() {
        const res = this.input.res;

        this.setCacheControl(res, 60 * 24 * 30);

        const data = createAppConfig(OurnetProjectName.NEWS, this.input.country);

        const url = getFaviconUrl(data.domain, 'apple-touch-icon.png');

        return this.redirect(res, url, 301);
    }
}
