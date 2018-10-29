import { OurnetApp } from "../ournet/app";
import { IOurnetAppData, OurnetProjectName } from "../ournet/data";
import { IndexRouter } from "./routes/index-router";
import { ImportantRouter } from "./routes/important-router";
import { QuotesRouter } from "./routes/quotes-router";
import { TopicRouter } from "./routes/topic-router";
import { EventRouter } from "./routes/event-router";

export class NewsOurnetApp extends OurnetApp<IOurnetAppData> {

    constructor() {
        super([
            new IndexRouter(),
            new ImportantRouter(),
            new QuotesRouter(),
            new TopicRouter(),
            new EventRouter(),
        ], OurnetProjectName.NEWS);
    }
}
