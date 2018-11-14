
import { NewsViewModel, NewsViewModelBuilder } from "./news-view-model";
import { NewsItem, NewsItemStringFields, ArticleContent, ArticleContentStringFields, NewsEvent, NewsEventStringFields } from "@ournet/api-client";
import { notFound } from "boom";
import { ArticleContentBuilder } from '@ournet/news-domain';
import { OurnetViewModelInput } from "../../ournet/view-model";
import { filterIrrelevantTopics } from "../irrelevant-topics";

export interface ItemViewModelInput extends OurnetViewModelInput {
    id: string
}

export interface ItemViewModel extends NewsViewModel {
    latestEvents: NewsEvent[]
    similarEvents: NewsEvent[]
    item: NewsItem
    event?: NewsEvent
    articleContent?: ArticleContent
}

export class ItemViewModelBuilder extends NewsViewModelBuilder<ItemViewModel, ItemViewModelInput> {

    async build() {

        const { id } = this.input;

        const localeApi = this.data.createQueryApiClient<{ item: NewsItem }>();
        localeApi.newsItemById('item', { fields: NewsItemStringFields }, { id });

        const apiResult = await this.executeApiClient(localeApi);

        if (!apiResult.item) {
            throw notFound(`Not found event id=${id}`);
        }
        const model = this.model;

        const newsItem = model.item = apiResult.item;
        const { lang, links, head, country } = model;

        head.title = newsItem.title;
        head.description = newsItem.summary;

        this.setCanonical(links.news.item(newsItem.id, { ul: lang }));

        const relevaltTopicsIds = newsItem.topics && filterIrrelevantTopics({ lang, country }, newsItem.topics).map(item => item.id) || [];

        this.apiClient.newsEventsLatest('latestEvents', { fields: NewsEventStringFields }, { params: { lang, country, limit: 4 } });
        if (relevaltTopicsIds.length) {
            this.apiClient.newsSimilarEventsByTopics('similarEvents', { fields: NewsEventStringFields }, { params: { lang, country, limit: 2, topicIds: relevaltTopicsIds.slice(0, 2), exceptId: newsItem.id } });
        }

        if (newsItem.hasContent) {
            this.apiClient.newsArticleContentById('articleContent', { fields: ArticleContentStringFields }, { id: ArticleContentBuilder.createId({ refId: id, refType: 'NEWS' }) });
        }

        if (newsItem.eventId) {
            this.apiClient.newsEventById('event', { fields: NewsEventStringFields }, { id: newsItem.eventId });
        }

        return super.build();
    }
}
