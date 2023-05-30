import * as React from "react";
import { IndexViewModel } from "../../view-models/index-view-model";
import CommonLayout from "../common-layout";
import { HoroscopeSvg } from "../../../views/components/horoscope/horoscope-svg";
import { HoroscopeCard } from "../../../views/components/horoscope/horoscope-card";
import { GroupHeader } from "../../../views/components/group-header";
import { getSchema, getHost } from "ournet.links";
import { OurnetProjectName } from "../../../ournet/data";
import { EventListItem } from "../../../news/views/components/event-list-item";
import { QuoteListItem } from "../../../news/views/components/quote-list-item";

export default class IndexPage extends React.Component<IndexViewModel> {
  render() {
    const {
      lang,
      head,
      locales,
      links,
      latestEvents,
      country,
      latestQuotes,
      config,
      project,
      containsProject
    } = this.props;

    const horo = containsProject(OurnetProjectName.HOROSCOPE);

    const newsSchema = getSchema(OurnetProjectName.NEWS, country);
    const newsHost = getHost(OurnetProjectName.NEWS, country);

    const newsUrl = newsSchema + "//" + newsHost;

    head.elements.push(
      <link
        key="events-rss"
        rel="alternate"
        type="application/rss+xml"
        title={locales.events()}
        href={newsUrl + links.news.rss.stories({ ul: lang })}
      ></link>
    );
    head.elements.push(
      <link
        key="imortant-rss"
        rel="alternate"
        type="application/rss+xml"
        title={locales.important_news()}
        href={newsUrl + links.news.rss.stories.important({ ul: lang })}
      ></link>
    );

    return (
      <CommonLayout {...this.props}>
        {horo && HoroscopeSvg()}
        <main>
          <div className="o-layout">
            {latestEvents.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="o-layout__item u-1/4@tablet u-1/2@mobile"
              >
                {EventListItem({
                  lang,
                  country,
                  item,
                  links,
                  timezone: config.timezone,
                  view: "card",
                  project
                })}
              </div>
            ))}
          </div>
          <div className="o-layout">
            {horo && (
              <div className="o-layout__item u-1/4@tablet u-1/2@mobile">
                {HoroscopeCard({
                  links,
                  lang,
                  country,
                  title: locales.horoscope()
                })}
              </div>
            )}

            {latestEvents.slice(4, horo ? 7 : 8).map((item) => (
              <div
                key={item.id}
                className="o-layout__item u-1/4@tablet u-1/2@mobile"
              >
                {EventListItem({
                  lang,
                  country,
                  item,
                  links,
                  timezone: config.timezone,
                  view: "card",
                  project
                })}
              </div>
            ))}
          </div>
          <div className="c-group">
            {GroupHeader({
              name: locales.latest_quotes(),
              link: newsUrl + links.news.quotes({ ul: lang }),
              type: "important"
            })}
            <div className="o-layout">
              {latestQuotes &&
                latestQuotes.map((item) => (
                  <div key={item.id} className="o-layout__item u-1/3@tablet">
                    {QuoteListItem({
                      lang,
                      country,
                      links,
                      timezone: config.timezone,
                      view: "card",
                      item,
                      project
                    })}
                  </div>
                ))}
            </div>
          </div>
          <div className="o-layout">
            {latestEvents
              .slice(horo ? 7 : 8, (horo ? 7 : 8) + 8)
              .map((item) => (
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
                    view: "card",
                    project
                  })}
                </div>
              ))}
          </div>
        </main>
      </CommonLayout>
    );
  }
}
