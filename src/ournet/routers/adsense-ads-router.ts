import { OurnetRouter } from "../router";
import { Request, Response } from "../../base/types";
import { Handler } from "../../base/handler";
import { OurnetAppData } from "../data";
import { OurnetViewModelInput } from "../view-model";


export class AdsenseAdsRouter extends OurnetRouter {
    constructor() {
        super('/alt-adsense-ads.html');
    }
    protected createHander(req: Request, res: Response) {
        return new AdsenseAdsHandler(this.formatInput(req, res));
    }
}

class AdsenseAdsHandler extends Handler<OurnetAppData, OurnetViewModelInput> {
    handle() {

        this.setCacheControl(60 * 24 * 30);

        return this.redirect('https://d1mm9th3p1o4yr.cloudfront.net/backup-ads/index.html', 301);
    }
}
