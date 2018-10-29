import { NewsBaseRouter } from "../../router";
import { Request, Response } from "../../../base/types";
import { NewsBaseHandler } from "../../handlers/handler";

export class AdsenseAdsRouter extends NewsBaseRouter {
    constructor() {
        super('/alt-adsense-ads.html');
    }
    protected createHander(req: Request, res: Response) {
        return new Handler(this.formatInput(req, res));
    }
}

class Handler extends NewsBaseHandler {
    handle() {
        const res = this.input.res;

        this.setCacheControl(res, 60 * 24 * 30);

        return this.redirect(res, 'https://assets.ournetcdn.net/backup-ads/index.html', 301);
    }
}
