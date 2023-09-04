import { NewsViewModel, NewsViewModelBuilder } from "./news-view-model";
import {
  NewsEvent,
  NewsArticleContent,
  NewsArticleContentStringFields,
  Quote,
  QuoteStringFields
} from "@ournet/api-client";
import { notFound } from "boom";
import { ArticleContentBuilder } from "@ournet/news-domain";
import { OurnetViewModelInput } from "../../ournet/view-model";
import { filterIrrelevantTopics } from "../irrelevant-topics";
import { LIST_EVENTS_FIEDLS } from "../config";

export interface EventViewModelInput extends OurnetViewModelInput {
  id: string;
}

export interface EventViewModel extends NewsViewModel {
  similarEvents: NewsEvent[];
  event: NewsEvent;
  eventContent?: NewsArticleContent;
  eventQuotes?: Quote[];
}

export class EventViewModelBuilder extends NewsViewModelBuilder<
  EventViewModel,
  EventViewModelInput
> {
  async build() {
    const { id } = this.input;

    const localeApi = this.data.createQueryApiClient<{ event: NewsEvent }>();
    localeApi.newsEventById(
      "event",
      {
        fields:
          "id title slug summary source { id host path sourceId } lang country imageId imageHost imageSourceId countNews countViews countQuotes countVideos countImages topics { id name slug abbr type } quotesIds videosIds imagesIds status createdAt updatedAt hasContent"
      },
      { id }
    );

    const apiResult = await this.executeApiClient(localeApi);

    if (!apiResult.event) {
      throw notFound(`Not found event id=${id}`);
    }
    const model = this.model;

    const event = (model.event = apiResult.event);
    const { lang, links, head, country } = model;

    head.title = event.title;
    head.description = event.summary;

    this.setCanonical(links.news.story(event.slug, event.id, { ul: lang }));

    const relevaltTopicsIds = filterIrrelevantTopics(
      { lang, country },
      event.topics
    ).map((item) => item.id);

    this.apiClient.newsSimilarEventsByTopics(
      "similarEvents",
      { fields: LIST_EVENTS_FIEDLS },
      {
        params: {
          lang,
          country,
          limit: 2,
          topicIds: relevaltTopicsIds.slice(0, 2),
          exceptId: event.id
        }
      }
    );

    if (event.hasContent) {
      this.apiClient.newsArticleContentById(
        "eventContent",
        { fields: NewsArticleContentStringFields },
        { id: ArticleContentBuilder.createId({ refId: id, refType: "EVENT" }) }
      );
    }
    if (event.quotesIds && event.quotesIds.length) {
      this.apiClient.quotesQuotesByIds(
        "eventQuotes",
        { fields: QuoteStringFields },
        { ids: event.quotesIds }
      );
    }
    return super.build();
  }
}
