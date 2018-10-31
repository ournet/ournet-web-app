import { OurnetApp } from "../ournet/app";
import { IOurnetAppData, OurnetProjectName } from "../ournet/data";
import { IndexRouter } from "./routes/index-router";
import { AppleIconRouter } from "../ournet/routers/apple-icon-router";
import { FaviconRouter } from "../ournet/routers/favicon-router";
import { AdsenseAdsRouter } from "../ournet/routers/adsense-ads-router";
import { ManifestRouter } from "./routes/manifest-router";
import { Request, Response } from "../base/types";
import logger from "../logger";
import { ErrorHandler } from "./handlers/error-handler";
import { parse } from "url";
import { getHostInfo } from "../hosts";
import { PlacesDailyForecastRouter } from "./routes/places-daily-forecast-router";
import { ListRouter } from "./routes/list-router";
import { PlaceRouter } from "./routes/place-router";

export class WeatherOurnetApp extends OurnetApp<IOurnetAppData> {

    constructor() {
        super([
            new IndexRouter(),
            new FaviconRouter(),
            new AppleIconRouter(),
            new AdsenseAdsRouter(),
            new ManifestRouter(),

            new PlacesDailyForecastRouter(),
            new ListRouter(),
            new PlaceRouter(),
        ], OurnetProjectName.WEATHER);
    }

    protected handleError(req: Request, res: Response, error: Error): Promise<void> {
        logger.error(error);

        console.trace(error)

        const url = parse(req.url || '', true);
        const host = url.hostname || '';
        const hostInfo = getHostInfo(host);

        return new ErrorHandler({ req, res, error, url, host, project: hostInfo.project, country: hostInfo.country })
            .handle(this.data);
    }
}
