import * as React from "react";
import CommonLayout from "../common-layout";
import { EventListItem } from "../../../news/views/components/event-list-item";
import { PortalViewModel } from "../../view-models/portal-view-model";
import adsTitle from "./ads-title";
import adsContent from "./ads-content";

export default class AdsPage extends React.Component<PortalViewModel> {
  render() {
    const {
      lang,
      links,
      latestEvents = [],
      country,
      config,
      project
    } = this.props;

    return (
      <CommonLayout {...this.props}>
        <main>
          <div className="o-layout">
            <div className="o-layout__item u-4/6@desktop">
              <article className="c-event">
                <div style={{ padding: "12px 12px 24px 12px" }}>
                  <div className="o-layout o-layout--small">
                    <div className="o-layout__item u-1/6@tablet"></div>
                    <div className="o-layout__item u-5/6@tablet">
                      <h1 className="c-event__title">{adsTitle(lang)}</h1>
                      <div className="c-event__text">
                        {adsContent(lang, country)}
                      </div>
                      <hr />
                    </div>
                  </div>
                </div>
              </article>
            </div>
            <div className="o-layout__item u-2/6@desktop">
              <div className="o-layout o-layout--small">
                {latestEvents.map((item) => (
                  <div
                    key={item.id}
                    className="o-layout__item u-1/2@tablet u-1/1@desktop"
                  >
                    {EventListItem({
                      lang,
                      country,
                      item,
                      links,
                      timezone: config.timezone,
                      view: "card-bare",
                      project
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </CommonLayout>
    );
  }
}
