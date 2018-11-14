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
import { PlacesDailyForecastRouter } from "./routes/places-daily-forecast-router";
import { ListRouter } from "./routes/list-router";
import { PlaceRouter } from "./routes/place-router";
import { PlacesAdmin1Router, PlacesRouter } from "./routes/places-router";
import { Widget2RedirectRouter, Place10DaysRedirectRouter, PrefixPlaceRedirectRouter, PrefixPlacesAdminRedirectRouter, PrefixPlacesRedirectRouter } from "./routes/redirect-handler";
import { WidgetRouter, Widget1HtmlScriptRouter, Widget1FrameRouter, Widget2FrameRouter, Widget2HtmlScriptRouter } from "./routes/widget-router";
import { JsonFindPlaceRouter } from "./routes/json-find-place-router";
import { RobotsRouter, OneSignalSDKWorkerRouter, OneSignalSDKUpdaterWorkerRouter } from "./routes/static-router";

export class WeatherOurnetApp extends OurnetApp<IOurnetAppData> {

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

            new PlacesDailyForecastRouter(),
            new ListRouter(),
            new PlaceRouter(),
            new PlacesRouter(),
            new PlacesAdmin1Router(),

            new Widget2RedirectRouter(),
            new Place10DaysRedirectRouter(),
            new PrefixPlaceRedirectRouter(),
            new PrefixPlacesAdminRedirectRouter(),
            new PrefixPlacesRedirectRouter(),

            new WidgetRouter(),
            new Widget1FrameRouter(),
            new Widget1HtmlScriptRouter(),
            new Widget2FrameRouter(),
            new Widget2HtmlScriptRouter(),

            new JsonFindPlaceRouter(),
        ], OurnetProjectName.WEATHER);
    }

    protected handleError(req: Request, res: Response, error: Error): Promise<void> {
        this.logError(error, req);

        const url = parse(req.url || '', true);
        const host = req.headers.host || ''
        const hostInfo = getHostInfo(host);

        return new ErrorHandler({ req, res, error, url, host, project: hostInfo.project, country: hostInfo.country })
            .handle(this.data);
    }
}
