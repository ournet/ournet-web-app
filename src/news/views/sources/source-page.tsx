import * as React from "react";
import CommonLayout from "../common-layout";
import { entipicUrl, addUtmSource } from "../../../helpers";
import { SectionHeader } from "../../../views/components/section-header";
import { EventListItem } from "../components/event-list-item";
import { NewsItemListItem } from "../components/item-list-item";
import { AdCenter } from "../components/ads/ad-center";
import PageContentSection from "../../../views/components/page-content-section";
import { Share } from "../../../views/components/share";
import { SourceViewModel } from "../../view-models/source-view-model";

export default class SourcePage extends React.Component<SourceViewModel> {
  render() {
    const {
      lang,
      head,
      country,
      locales,
      links,
      source,
      config,
      news,
      title,
      latestEvents
    } = this.props;

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
                        className="c-topic-h__img"
                        src={entipicUrl(source.name, "c", lang, country)}
                        alt={source.name}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="o-media__body">
                      <h2>
                        <a href={addUtmSource(source.url, config.domain)} target="_blank" rel="noopener noreferrer">
                          {head.description}
                        </a>
                      </h2>
                      {Share({
                        lang,
                        url: head.canonical,
                        services: config.shareServices
                      })}
                    </div>
                  </div>
                </div>

                {news.length > 0 ? (
                  <div className="c-section">
                    <hr />
                    {news.map((item) =>
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
                {AdCenter()}
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
