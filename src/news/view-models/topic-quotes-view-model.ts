import { NewsViewModelBuilder, NewsViewModel } from "./news-view-model";
import {
  QuoteStringFields,
  NewsEvent,
  Quote,
  Topic,
  TopicStringFields
} from "@ournet/api-client";
import { OurnetViewModelInput } from "../../ournet/view-model";
import { TopicHelper } from "@ournet/topics-domain";
import { notFound } from "boom";
import { LIST_EVENTS_FIEDLS } from "../config";
import { topicDisplayName } from "../helpers";

export class TopicQuotesViewModelBuilder<
  T extends TopicQuotesViewModel,
  I extends TopicQuotesViewModelInput
> extends NewsViewModelBuilder<T, I> {
  async build() {
    const model = this.model;

    const { lang, country, locales, head, links } = model;
    let { slug } = this.input;
    model.slug = slug = slug.trim().toLowerCase();
    const id = TopicHelper.formatIdFromSlug(slug, { lang, country });

    const localeApi = this.data.createQueryApiClient<{ topic: Topic }>();
    localeApi.topicsTopicById("topic", { fields: TopicStringFields }, { id });

    const apiResult = await this.executeApiClient(localeApi);

    if (!apiResult.topic) throw notFound(`Not found topic id=${id}`);

    const topic = (model.topic = apiResult.topic);
    const commonName = topicDisplayName(topic);

    const displayName = (model.displayName =
      commonName +
      (topic.abbr && topic.abbr.length < 10 ? ` (${topic.abbr})` : ""));

    head.title = locales.news_topic_quotes_page_title_format({
      name: displayName
    });
    head.description = locales.news_topic_quotes_description_format({
      name: topic.name
    });

    this.setCanonical(links.news.topicQuotes(slug, { ul: lang }));

    this.apiClient
      .newsEventsLatest(
        "latestEvents",
        { fields: LIST_EVENTS_FIEDLS },
        { params: { lang, country, limit: 4 } }
      )
      .quotesLatestByTopic(
        "aboutQuotes",
        { fields: QuoteStringFields },
        { params: { country, lang, limit: 12, topicId: topic.id } }
      );

    if (topic.type === "PERSON") {
      this.apiClient.quotesLatestByAuthor(
        "byQuotes",
        { fields: QuoteStringFields },
        { params: { country, lang, limit: 12, authorId: topic.id } }
      );
    }
    return super.build();
  }
}

export interface TopicQuotesViewModelInput extends OurnetViewModelInput {
  slug: string;
}

export interface TopicQuotesViewModel extends NewsViewModel {
  latestEvents: NewsEvent[];
  topic: Topic;
  aboutQuotes: Quote[];
  byQuotes?: Quote[];
  displayName: string;
  slug: string;
}
