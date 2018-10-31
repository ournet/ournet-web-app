import { NewsBaseRouter } from "../../router";
import { Request, Response } from "../../../base/types";
import { NewsEventStringFields } from "@ournet/api-client";
import { NewsBaseHandler } from "../../handlers/handler";
import { INewsAppData } from "../../data";
import * as Rss from 'rss';
import { NewsLocaleNames } from "../../locale";
import { LocaleHelpers } from "../../../ournet/locale";
import { getSchema, getHost } from "ournet.links";
import { createStoryFeedItem } from "../../../helpers";
import { NewsViewModelBuilder } from "../../view-models/news-view-model";
import { IndexViewModel } from "../../view-models/index-view-model";
import { OurnetViewModelInput } from "../../../ournet/view-model";



export class RssStoriesRouter extends NewsBaseRouter {
    constructor() {
        super('/rss/stories.xml')
    }

    protected createHander(req: Request, res: Response) {
        const input = this.formatInput(req, res);
        return new RssHandler(input);
    }
}

class RssHandler extends NewsBaseHandler {
    async handle(data: INewsAppData) {
        const viewData = await new RssStoriesViewModelBuilder(this.input, data).build();
        const { translate, country, project, links, lang } = viewData;

        this.setCacheControl(15);

        const title = translate(NewsLocaleNames.site_title, { country: LocaleHelpers.getCountryName(translate, country) });
        const description = translate(NewsLocaleNames.site_description, { country: LocaleHelpers.getCountryName(translate, country) });

        const schema = getSchema(project, country);
        const host = getHost(project, country);

        const feed = new Rss({
            title,
            description,
            feed_url: schema + '//' + host + links.news.rss.stories({ ul: lang }),
            site_url: schema + '//' + host,
            language: lang,
            pubDate: new Date(),
            ttl: 15,
            generator: translate(NewsLocaleNames.app_name),
        });

        const events = viewData.latestEvents || [];

        events.forEach(function (story) {
            feed.item(createStoryFeedItem(links, story, lang, schema, host));
        });

        return this.send(feed.xml(), 200, { 'Content-Type': 'application/rss+xml; charset=utf-8' });
    }
}

class RssStoriesViewModelBuilder extends NewsViewModelBuilder<IndexViewModel,OurnetViewModelInput> {
    build() {
        const { lang, country } = this.model;

        this.apiClient.newsEventsLatest('latestEvents', { fields: NewsEventStringFields }, { params:{lang, country, limit: 10} });

        return super.build();
    }
}
