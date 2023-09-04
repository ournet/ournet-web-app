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
import { RobotsRouter } from "./routes/robots-router";
import { PrefixOldWidgetRedirectRouter } from "./routes/redirect-router";
import { ManifestRouter } from "../ournet/routers/manifest-router";
import { AdsTxtRouter } from "../ournet/routers/ads-txt-router";

export class PortalOurnetApp extends OurnetApp<OurnetAppData> {
  constructor() {
    super(
      [
        new AdsTxtRouter(),
        new RobotsRouter(),
        new IndexRouter(),
        new FaviconRouter(),
        new AppleIconRouter(),
        new AdsenseAdsRouter(),
        new ManifestRouter(),
        new PrefixOldWidgetRedirectRouter()
      ],
      OurnetProjectName.PORTAL
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
