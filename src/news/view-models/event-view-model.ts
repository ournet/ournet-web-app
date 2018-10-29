
import { NewsViewModel, NewsViewModelBuilder } from "./news-view-model";
import { NewsEvent, NewsEventStringFields, ArticleContent, ArticleContentStringFields, Quote, QuoteStringFields } from "@ournet/api-client";
import { notFound } from "boom";
import { ArticleContentBuilder } from '@ournet/news-domain';
import { OurnetViewModelInput } from "../../ournet/view-model";
import { filterIrrelevantTopics } from "../irrelevant-topics";

export interface EventViewModelInput extends OurnetViewModelInput {
    id: string
}

export interface EventViewModel extends NewsViewModel {
    latestEvents: NewsEvent[]
    similarEvents: NewsEvent[]
    event: NewsEvent
    eventContent?: ArticleContent
    eventQuotes?: Quote[]
}

export class EventViewModelBuilder extends NewsViewModelBuilder<EventViewModel, EventViewModelInput> {

    async build() {

        const { id } = this.input;

        const localeApi = this.data.createQueryApiClient<{ event: NewsEvent }>();
        localeApi.newsEventById('event', { fields: NewsEventStringFields }, { id });

        const apiResult = await this.executeApiClient(localeApi);

        if (!apiResult.event) {
            throw notFound(`Not found event id=${id}`);
        }
        const event = this.model.event = apiResult.event;
        const { lang, links, head, country } = this.model;

        head.title = event.title;
        head.description = event.summary;

        this.setCanonical(links.news.story(event.slug, event.id, { ul: lang }));

        const relevaltTopicsIds = filterIrrelevantTopics({ lang, country }, event.topics).map(item => item.id);

        this.apiClient.newsEventsLatest('latestEvents', { fields: NewsEventStringFields }, { params: { lang, country, limit: 3 } })
            .newsSimilarEventsByTopics('similarEvents', { fields: NewsEventStringFields }, { params: { lang, country, limit: 3, topicIds: relevaltTopicsIds.slice(0, 2), exceptId: event.id } });

        if (event.hasContent) {
            this.apiClient.newsArticleContentById('eventContent', { fields: ArticleContentStringFields }, { id: ArticleContentBuilder.createId({ refId: id, refType: 'EVENT' }) });
        }
        if (event.quotesIds && event.quotesIds.length) {
            this.apiClient.quotesQuotesByIds('eventQuotes', { fields: QuoteStringFields }, { ids: event.quotesIds });
        }
        return super.build();
    }
}
