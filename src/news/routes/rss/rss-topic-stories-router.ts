import { NewsBaseRouter, NewsBaseRouterData } from "../../router";
import { Request, Response } from "../../../base/types";
import { NewsEventStringFields, NewsEvent, Topic, TopicStringFields } from "@ournet/api-client";
import { NewsBaseHandler } from "../../handlers/handler";
import { NewsAppData } from "../../data";
import * as Rss from 'rss';
import { getSchema, getHost } from "ournet.links";
import { createStoryFeedItem } from "../../../helpers";
import { OurnetViewModelInput } from "../../../ournet/view-model";
import { NewsViewModelBuilder, NewsViewModel } from "../../view-models/news-view-model";
import { TopicHelper } from "@ournet/topics-domain";
import { notFound } from "boom";

interface RssTopicStoriesRouterData extends NewsBaseRouterData {
    slug: string
}

export class RssTopicStoriesRouter extends NewsBaseRouter<RssTopicStoriesRouterData> {
    constructor() {
        super('/rss/stories/topic/([^/]+).xml', ['slug'])
    }

    protected createHander(req: Request, res: Response, data: RssTopicStoriesRouterData) {
        const input = this.formatInput<RssTopicStoriesViewModelInput>(req, res);
        input.slug = data.slug;
        return new RssHandler(input);
    }
}

class RssHandler extends NewsBaseHandler<RssTopicStoriesViewModelInput> {
    async handle(data: NewsAppData) {
        const viewData = await new RssTopicViewModelBuilder(this.input, data).build();
        const { locales, country, project, links, lang, topic } = viewData;

        if (!topic) {
            throw notFound(`Not found topic slug=${this.input.slug}`);
        }

        this.setCacheControl(15);

        const title = locales.topic_latest_news_format({ name: topic.name });

        const schema = getSchema(project, country);
        const host = getHost(project, country);

        const feed = new Rss({
            title,
            feed_url: schema + '//' + host + links.news.rss.stories.topic(this.input.slug.trim().toLowerCase(), { ul: lang }),
            site_url: schema + '//' + host,
            language: lang,
            pubDate: new Date(),
            ttl: 15,
            generator: locales.getAppName(project, country),
        });

        const events = viewData.events || [];

        events.forEach(function (story) {
            feed.item(createStoryFeedItem(links, story, lang, schema, host));
        });

        return this.send(feed.xml(), 200, { 'Content-Type': 'application/rss+xml; charset=utf-8' });
    }
}

interface RssTopicStoriesViewModelInput extends OurnetViewModelInput {
    slug: string
}

interface RssTopicStoriesViewModel extends NewsViewModel {
    events: NewsEvent[]
    topic: Topic
}

class RssTopicViewModelBuilder extends NewsViewModelBuilder<RssTopicStoriesViewModel, RssTopicStoriesViewModelInput> {
    async build() {
        const { lang, country } = this.model;
        const slug = this.input.slug.trim().toLowerCase();
        const id = TopicHelper.formatIdFromSlug(slug, { lang, country });

        this.apiClient.newsEventsLatestByTopic('events',
            { fields: NewsEventStringFields },
            { params: { country, lang, limit: 10, topicId: id } })
            .topicsTopicById('topic', { fields: TopicStringFields }, { id });

        return super.build();
    }
}
