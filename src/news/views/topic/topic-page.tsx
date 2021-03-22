import * as React from "react";
import CommonLayout from "../common-layout";
import { TopicViewModel } from "../../view-models/topic-view-model";
import { entipicUrl } from "../../../helpers";
import { SectionHeader } from "../../../views/components/section-header";
import { EventListItem } from "../components/event-list-item";
import { QuoteListItem } from "../components/quote-list-item";
import { NewsItemListItem } from "../components/item-list-item";
import { AdCenter } from "../components/ads/ad-center";
import PageContentSection from "../../../views/components/page-content-section";
import { AdAside } from "../components/ads/ad-aside";
import { Quote } from "@ournet/api-client";
import { Share } from "../../../views/components/share";

export default class TopicPage extends React.Component<TopicViewModel> {
  render() {
    const {
      lang,
      head,
      country,
      locales,
      links,
      latestEvents,
      topic,
      slug,
      displayName,
      config,
      topicEvents,
      topicNews,
      byQuotes,
      popularByQuotes,
      aboutQuotes
    } = this.props;

    let quotes: Quote[] = [];
    const quotesLimit = 3;

    if (topic.type === "PERSON") {
      quotes = byQuotes || quotes;
      if (popularByQuotes && popularByQuotes.length) {
        if (quotes.length >= quotesLimit) {
          quotes = quotes.splice(0, quotesLimit - 1);
        }
        quotes = quotes.concat(popularByQuotes).slice(0, quotesLimit);
      }
    }

    if (quotes.length < quotesLimit) {
      quotes = quotes.concat(aboutQuotes).slice(0, quotesLimit);
    }

    const commonName = topic.commonName || topic.name;
    const title = locales.topic_news_title_format({ name: displayName });

    head.elements.push(
      <link
        key="topic-rss"
        rel="alternate"
        type="application/rss+xml"
        title={title}
        href={links.news.rss.stories.topic(slug, { ul: lang })}
      ></link>
    );

    return (
      <CommonLayout {...this.props}>
        <PageContentSection>
          <main>
            <div className="o-layout">
              <div className="o-layout__item u-3/5@tablet c-topic">
                <div className="c-page-title">
                  <h1>{title || head.title}</h1>
                  <div className="o-media c-topic-h">
                    <div className="o-media__img">
                      <img
                        className="c-topic-h__img o-lazy"
                        src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                        data-src={entipicUrl(topic.name, "b", lang, country)}
                        alt={topic.name}
                      />
                    </div>
                    <div className="o-media__body">
                      <h2>{head.description}</h2>
                      {topic.description && <h4>{topic.description}</h4>}
                      {Share({
                        lang,
                        url: head.canonical,
                        services: config.shareServices
                      })}
                    </div>
                  </div>
                </div>

                {topicNews.length > 0 ? (
                  <div className="c-section">
                    <hr />
                    {topicNews.map((item) =>
                      NewsItemListItem({
                        lang,
                        links,
                        timezone: config.timezone,
                        item,
                        view: "tline"
                      })
                    )}
                    <hr />
                  </div>
                ) : null}
                {topicEvents.length > 0 ? (
                  <div className="c-section">
                    {SectionHeader({
                      name:
                        (topic.abbr || commonName) +
                        " - " +
                        locales.latest_events(),
                      h: "h4"
                    })}
                    <div className="o-layout">
                      {topicEvents.map((item) => (
                        <div
                          key={item.id}
                          className="o-layout__item u-1/2@mobile"
                        >
                          {EventListItem({
                            lang,
                            country,
                            item,
                            links,
                            timezone: config.timezone,
                            view: "card"
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
                {AdCenter()}
              </div>
              <div className="o-layout__item u-2/5@tablet">
                {quotes && quotes.length > 0 ? (
                  <div>
                    {SectionHeader({ name: locales.quotes(), h: "h4" })}
                    {quotes.map((item) =>
                      QuoteListItem({
                        lang,
                        country,
                        links,
                        timezone: config.timezone,
                        view: "card",
                        item
                      })
                    )}
                  </div>
                ) : null}
                {AdAside()}
              </div>
            </div>

            <div className="c-section">
              {SectionHeader({ name: locales.latest_events() })}
              <div className="o-layout">
                {latestEvents &&
                  latestEvents.map((item) => (
                    <div
                      key={item.id}
                      className="o-layout__item u-1/2@mobile u-1/4@tablet"
                    >
                      {EventListItem({
                        lang,
                        country,
                        item,
                        links,
                        timezone: config.timezone,
                        view: "card"
                      })}
                    </div>
                  ))}
              </div>
            </div>
          </main>
        </PageContentSection>
      </CommonLayout>
    );
  }
}
