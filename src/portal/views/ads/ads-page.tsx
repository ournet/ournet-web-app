import * as React from "react";
import CommonLayout from "../common-layout";
import { EventListItem } from "../../../news/views/components/event-list-item";
import { PortalViewModel } from "../../view-models/portal-view-model";
import adsTitle from "./ads-title";
import adsContent from "./ads-content";
import { cdn } from "ournet.links";

export default class AdsPage extends React.Component<PortalViewModel> {
  render() {
    const {
      lang,
      links,
      latestEvents = [],
      country,
      config,
      project,
      head
    } = this.props;

    const title = adsTitle(lang);
    const imageId = "01harq9yv3j25whrmsh7mfx8hzj";

    const imageLargeUrl =
      "https:" +
      cdn.media.image(imageId, {
        size: "large",
        ext: "webp"
      });

    head.elements.push(
      <meta key="og_type" property="og:type" content="article" />
    );
    head.elements.push(
      <meta key="og_image" property="og:image" content={imageLargeUrl} />
    );

    return (
      <CommonLayout {...this.props}>
        <main>
          <div className="o-layout">
            <div className="o-layout__item u-4/6@desktop">
              <article className="c-event">
                <div className={`c-event-media`}>
                  <img
                    className="c-event-media__pic"
                    alt={title}
                    src={cdn.media.image(imageId, {
                      size: "large",
                      ext: "webp"
                    })}
                  />
                </div>
                <div className="c-event__body">
                  <div className="o-layout o-layout--small">
                    <div className="o-layout__item u-1/6@tablet"></div>
                    <div className="o-layout__item u-5/6@tablet">
                      <h1 className="c-event__title">
                        <a href={links.portal.ads({ ul: lang })} title={title}>
                          {title}
                        </a>
                      </h1>
                      <div className="c-event__text">
                        {adsContent(lang, country)}
                      </div>
                      <style>
                        {`
                            .c-event__text img {
                              max-width: 100%;
                            }
                            .c-event__text a {
                              font-weight: bold;
                              color: #ca0000;
                            }
                            .c-event-media {
                              position: relative;
                              display: block;
                              overflow: hidden;
                              padding-bottom: 25%;
                            }
                            .c-event-media__pic {
                              position: absolute;
                              min-height: 100%;
                              min-width: 100%;
                              top: 50%;
                              left: 50%;
                              transform: translate(-50%, -50%);
                            }
                            .c-event-media__pic img { min-width: 100%; }
                          `}
                      </style>
                      <br />
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
