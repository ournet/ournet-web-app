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
import { PlacesDailyForecastRouter } from "./routes/places-daily-forecast-router";
import { ListRouter } from "./routes/list-router";
import { PlaceRouter } from "./routes/place-router";
import { PlacesAdmin1Router, PlacesRouter } from "./routes/places-router";
import {
  Widget2RedirectRouter,
  Place10DaysRedirectRouter,
  PrefixPlaceRedirectRouter,
  PrefixPlacesAdminRedirectRouter,
  PrefixPlacesRedirectRouter,
  PrefixOldWidgetRedirectRouter,
  OldWidgetRedirectRouter,
  PrefixPlaceNameRedirectRouter,
  PrefixPlace10DaysRedirectRouter
} from "./routes/redirect-handler";
import {
  WidgetRouter,
  Widget1HtmlScriptRouter,
  Widget1FrameRouter,
  Widget2FrameRouter,
  Widget2HtmlScriptRouter
} from "./routes/widget-router";
import { JsonFindPlaceRouter } from "./routes/json-find-place-router";
import {
  RobotsRouter,
  OneSignalSDKWorkerRouter,
  OneSignalSDKUpdaterWorkerRouter
} from "./routes/static-router";
import { ManifestRouter } from "../ournet/routers/manifest-router";
import {
  SitemapRegionIndexRouter,
  SitemapRegionPlacesRouter
} from "./routes/sitemap-router";
import { AdsRouter } from "../ournet/routers/ads-router";

export class WeatherOurnetApp extends OurnetApp<OurnetAppData> {
  constructor() {
    super(
      [
        new AdsRouter(),
        new RobotsRouter(),
        new SitemapRegionIndexRouter(),
        new SitemapRegionPlacesRouter(),
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
        new PrefixPlace10DaysRedirectRouter(),
        new PrefixPlaceNameRedirectRouter(),
        new PrefixPlacesAdminRedirectRouter(),
        new PrefixPlacesRedirectRouter(),

        new WidgetRouter(),
        new Widget1FrameRouter(),
        new Widget1HtmlScriptRouter(),
        new Widget2FrameRouter(),
        new Widget2HtmlScriptRouter(),

        new PrefixOldWidgetRedirectRouter(),
        new OldWidgetRedirectRouter(),

        new JsonFindPlaceRouter()
      ],
      OurnetProjectName.WEATHER
    );
  }

  protected handleError(
    req: Request,
    res: Response,
    error: Error
  ): Promise<void> {
    super.onError(error, req, res);

    const url = parse(req.url || "", true);
    const host = req.headers.host || "";
    const hostInfo = getHostInfo(host);

    return new ErrorHandler({
      req,
      res,
      error,
      url,
      host,
      project: hostInfo.project,
      country: hostInfo.country
    }).handle(this.data);
  }
}
