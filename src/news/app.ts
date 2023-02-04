import { OurnetApp } from "../ournet/app";
import { OurnetAppData, OurnetProjectName } from "../ournet/data";
import { IndexRouter } from "./routes/index-router";
import { ImportantRouter } from "./routes/important-router";
import { QuotesRouter } from "./routes/quotes-router";
import { TopicRouter } from "./routes/topic-router";
import { EventRouter } from "./routes/event-router";
import { ViewEventRouter } from "./routes/view-event-router";
import { ItemRouter } from "./routes/item-router";
import { ViewItemRouter } from "./routes/view-item-router";
import { UrlRouter } from "./routes/url-router";
import { AppleIconRouter } from "../ournet/routers/apple-icon-router";
import { FaviconRouter } from "../ournet/routers/favicon-router";
import { AdsenseAdsRouter } from "../ournet/routers/adsense-ads-router";
import { RssImportantRouter } from "./routes/rss/rss-important-stories-router";
import { RssStoriesRouter } from "./routes/rss/rss-stories-router";
import { RssTopicStoriesRouter } from "./routes/rss/rss-topic-stories-router";
import { Request, Response } from "../base/types";
import { ErrorHandler } from "./handlers/error-handler";
import { parse } from "url";
import { getHostInfo } from "../hosts";
import { RobotsRouter } from "./routes/static-router";
import { ManifestRouter } from "../ournet/routers/manifest-router";
import { VideoEmbedRouter } from "./routes/video-embed-router";
import { QuoteRouter } from "./routes/quote-router";
import { AdsRouter } from "../ournet/routers/ads-router";
import { SourcesRouter } from "./routes/sources-router";
import { SourceRouter } from "./routes/source-router";

export class NewsOurnetApp extends OurnetApp<OurnetAppData> {
  constructor() {
    super(
      [
        new AdsRouter(),
        new RobotsRouter(),

        new IndexRouter(),
        new ImportantRouter(),
        new QuotesRouter(),
        new TopicRouter(),
        new EventRouter(),
        new ItemRouter(),
        new QuoteRouter(),

        new ViewEventRouter(),
        new ViewItemRouter(),

        new UrlRouter(),
        new FaviconRouter(),
        new AppleIconRouter(),
        new AdsenseAdsRouter(),
        new ManifestRouter(),

        new RssImportantRouter(),
        new RssStoriesRouter(),
        new RssTopicStoriesRouter(),

        new VideoEmbedRouter(),
        new SourcesRouter(),
        new SourceRouter()
      ],
      OurnetProjectName.NEWS
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
