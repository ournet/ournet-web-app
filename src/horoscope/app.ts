import { OurnetApp } from "../ournet/app";
import { IOurnetAppData, OurnetProjectName } from "../ournet/data";
import { IndexRouter } from "./routes/index-router";
import { AppleIconRouter } from "../ournet/routers/apple-icon-router";
import { FaviconRouter } from "../ournet/routers/favicon-router";
import { AdsenseAdsRouter } from "../ournet/routers/adsense-ads-router";
import { ManifestRouter } from "./routes/manifest-router";
import { Request, Response } from "../base/types";
import { ErrorHandler } from "./handlers/error-handler";
import { parse } from "url";
import { getHostInfo } from "../hosts";
import { SignRouter } from "./routes/sign-router";
import { ApiRouter } from "./routes/api-router";
import { ApiReportsRouter } from "./routes/api-resports-router";
import { RobotsRouter, OneSignalSDKWorkerRouter, OneSignalSDKUpdaterWorkerRouter } from "./routes/static-router";

export class HoroscopeOurnetApp extends OurnetApp<IOurnetAppData> {

    constructor() {
        super([
            new RobotsRouter(),
            new OneSignalSDKWorkerRouter(),
            new OneSignalSDKUpdaterWorkerRouter(),
            
            new IndexRouter(),
            new FaviconRouter(),
            new AppleIconRouter(),
            new AdsenseAdsRouter(),
            new ManifestRouter(),

            new ApiRouter(),
            new ApiReportsRouter(),
            new SignRouter(),
        ], OurnetProjectName.HOROSCOPE);
    }

    protected handleError(req: Request, res: Response, error: Error): Promise<void> {
        this.logError(error, req);

        const url = parse(req.url || '', true);
        const host = url.hostname || '';
        const hostInfo = getHostInfo(host);

        return new ErrorHandler({ req, res, error, url, host, project: hostInfo.project, country: hostInfo.country })
            .handle(this.data);
    }
}
