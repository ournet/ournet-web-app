import * as React from "react";
import { HoroscopeViewModel } from "../view-models/horoscope-view-model";
import Layout from "./layout";
import { AdAside } from "./components/ads/ad-aside";
import { SectionHeader } from "../../views/components/section-header";
import { getSchema, getHost } from "ournet.links";
import { OurnetProjectName } from "../../ournet/data";
import { EventListItem } from "../../news/views/components/event-list-item";
import { getAssetUrl } from "../../assets";
import env from "../../env";
import PageContentSection from "../../views/components/page-content-section";
import { TopCuriousListItem } from "../../news/views/components/topcurious-item";

export default class CommonLayout extends React.Component<HoroscopeViewModel> {
  render() {
    const {
      project,
      children,
      latestNews,
      locales,
      country,
      links,
      lang,
      config,
      topCuriousNews
    } = this.props;
    return (
      <Layout {...this.props}>
        <PageContentSection>
          <div className="o-layout">
            <div className="o-layout__item u-4/6@desktop">{children}</div>
            <div className="o-layout__item u-2/6@desktop">
              {AdAside()}
              {latestNews && latestNews.length > 0 && (
                <div className="c-section">
                  {SectionHeader({
                    name: locales.latest_news(),
                    link:
                      getSchema(OurnetProjectName.NEWS, country) +
                      "//" +
                      getHost(OurnetProjectName.NEWS, country) +
                      links.news.home({ ul: lang })
                  })}
                  <div className="o-layout o-layout--small">
                    {latestNews
                      .slice(0, topCuriousNews.length ? 2 : 4)
                      .map((item) => (
                        <div
                          key={item.id}
                          className="o-layout__item u-1/2@tablet u-1/1@desktop"
                        >
                          {EventListItem({
                            lang,
                            country,
                            project,
                            links,
                            timezone: config.timezone,
                            item,
                            view: "card-bare",
                            imageSize: "small"
                          })}
                        </div>
                      ))}
                    {topCuriousNews.slice(0, 2).map((item) => (
                      <div
                        key={item.url}
                        className="o-layout__item u-1/2@tablet u-1/1@desktop"
                      >
                        {TopCuriousListItem({ item, view: "card-bare" })}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </PageContentSection>
        <script
          async={true}
          src={getAssetUrl(project, "js", "main", env.isProduction)}
        />
      </Layout>
    );
  }
}
