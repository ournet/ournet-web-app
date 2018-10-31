import { NewsBaseRouter } from "../../router";
import { Request, Response } from "../../../base/types";
import { ImportantViewModelBuilder } from "../../view-models/important-view-model";
import { NewsEventStringFields } from "@ournet/api-client";
import { NewsBaseHandler } from "../../handlers/handler";
import { INewsAppData } from "../../data";
import * as Rss from 'rss';
import { NewsLocaleNames } from "../../locale";
import { LocaleHelpers } from "../../../ournet/locale";
import { getSchema, getHost } from "ournet.links";
import { createStoryFeedItem } from "../../../helpers";



export class RssImportantRouter extends NewsBaseRouter {
    constructor() {
        super('/rss/stories/important.xml')
    }

    protected createHander(req: Request, res: Response) {
        const input = this.formatInput(req, res);
        return new RssHandler(input);
    }
}

class RssHandler extends NewsBaseHandler {
    async handle(data: INewsAppData) {
        const viewData = await new RssImportantViewModelBuilder(this.input, data).build();
        const { translate, country, project, links, lang } = viewData;

        this.setCacheControl(60 * 3);

        const title = translate(NewsLocaleNames.important_news);
        const description = translate(NewsLocaleNames.most_important_news_in_last_7days_country, { country: LocaleHelpers.getCountryName(translate, country) });

        const schema = getSchema(project, country);
        const host = getHost(project, country);

        const feed = new Rss({
            title,
            description,
            feed_url: schema + '//' + host + links.news.rss.stories.important({ ul: lang }),
            site_url: schema + '//' + host,
            language: lang,
            pubDate: new Date(),
            ttl: 3 * 60,
            generator: translate(NewsLocaleNames.app_name),
        });

        const events = viewData.importantEvents || [];

        events.forEach(function (story) {
            feed.item(createStoryFeedItem(links, story, lang, schema, host));
        });

        return this.send(feed.xml(), 200, { 'Content-Type': 'application/rss+xml; charset=utf-8' });
    }
}

class RssImportantViewModelBuilder extends ImportantViewModelBuilder {
    async build() {
        const { lang, country, currentDate } = this.model;

        const ids = await this.getImportantEventsIds({ limit: 10, lang, country, currentDate });

        this.apiClient.newsEventsByIds('importantEvents', { fields: NewsEventStringFields }, { ids });

        return super.build();
    }
}
