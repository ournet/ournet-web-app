import { OurnetApp } from "../ournet/app";
import { OurnetAppData, OurnetProjectName } from "../ournet/data";
import { IndexRouter } from "./routes/index-router";
import { AppleIconRouter } from "../ournet/routers/apple-icon-router";
import { FaviconRouter } from "../ournet/routers/favicon-router";
import { AdsenseAdsRouter } from "../ournet/routers/adsense-ads-router";
import { Request, Response } from "../base/types";
import { ErrorHandler } from "./handlers/error-handler";
import { parse } from "url";
import { getHostInfo } from "../hosts";
import { SignRouter } from "./routes/sign-router";
import { ApiReportsRouter } from "./routes/api-resports-router";
import { RobotsRouter, OneSignalSDKWorkerRouter, OneSignalSDKUpdaterWorkerRouter } from "./routes/static-router";
import { ManifestRouter } from "../ournet/routers/manifest-router";
import { AssetlinksRouter } from "./routes/assetlinks";
import { Widget1Router } from "./routes/widget1-router";
import { WidgetsRouter } from "./routes/widgets-router";

export class HoroscopeOurnetApp extends OurnetApp<OurnetAppData> {

    constructor() {
        super([
            new RobotsRouter(),
            new AssetlinksRouter(),
            new OneSignalSDKWorkerRouter(),
            new OneSignalSDKUpdaterWorkerRouter(),
            
            new IndexRouter(),
            new FaviconRouter(),
            new AppleIconRouter(),
            new AdsenseAdsRouter(),
            new ManifestRouter(),

            new ApiReportsRouter(),

            new WidgetsRouter(),
            new Widget1Router(),

            new SignRouter(),
        ], OurnetProjectName.HOROSCOPE);
    }

    protected handleError(req: Request, res: Response, error: Error): Promise<void> {
        super.onError(error, req, res);

        const url = parse(req.url || '', true);
        const host = req.headers.host || ''
        const hostInfo = getHostInfo(host);

        return new ErrorHandler({ req, res, error, url, host, project: hostInfo.project, country: hostInfo.country })
            .handle(this.data);
    }
}
