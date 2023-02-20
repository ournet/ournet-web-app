import * as React from "react";
import CommonLayout from "../common-layout";
import { entipicUrl } from "../../../helpers";
import { SectionHeader } from "../../../views/components/section-header";
import { EventListItem } from "../components/event-list-item";
import { QuoteListItem } from "../components/quote-list-item";
import PageContentSection from "../../../views/components/page-content-section";
import { Quote } from "@ournet/api-client";
import { Share } from "../../../views/components/share";
import { TopicQuotesViewModel } from "../../view-models/topic-quotes-view-model";

export default class TopicQuotesPage extends React.Component<TopicQuotesViewModel> {
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
      config,
      byQuotes,
      aboutQuotes,
      title
    } = this.props;

    let quotes: Quote[] = aboutQuotes;

    if (topic.type === "PERSON") {
      quotes = byQuotes || quotes;
    }

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
            <div className="o-layout">
              {quotes.map((item) => (
                <div key={item.id} className="o-layout__item u-1/3@tablet">
                  {QuoteListItem({
                    country,
                    lang,
                    links,
                    timezone: config.timezone,
                    item,
                    view: "card"
                  })}
                </div>
              ))}
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
