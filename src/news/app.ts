import { OurnetApp } from "../ournet/app";
import { IOurnetAppData, OurnetProjectName } from "../ournet/data";
import { IndexRouter } from "./routes/index-router";
import { ImportantRouter } from "./routes/important-router";
import { QuotesRouter } from "./routes/quotes-router";
import { TopicRouter } from "./routes/topic-router";
import { EventRouter } from "./routes/event-router";
import { ViewEventRouter } from "./routes/view-event-router";
import { ItemRouter } from "./routes/item-router";
import { ViewItemRouter } from "./routes/view-item-router";
import { UrlRouter } from "./routes/redirects/url-router";
import { FaviconRouter } from "./routes/redirects/favicon-router";
import { AppleIconRouter } from "./routes/redirects/apple-icon-router";
import { AdsenseAdsRouter } from "./routes/redirects/adsense-ads-router";

export class NewsOurnetApp extends OurnetApp<IOurnetAppData> {

    constructor() {
        super([
            new IndexRouter(),
            new ImportantRouter(),
            new QuotesRouter(),
            new TopicRouter(),
            new EventRouter(),
            new ItemRouter(),
            new ViewEventRouter(),
            new ViewItemRouter(),
            
            new UrlRouter(),
            new FaviconRouter(),
            new AppleIconRouter(),
            new AdsenseAdsRouter(),
        ], OurnetProjectName.NEWS);
    }
}
