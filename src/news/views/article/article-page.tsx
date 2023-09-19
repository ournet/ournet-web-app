import * as React from "react";
import CommonLayout from "../common-layout";
import * as moment from "moment-timezone";
import { SectionHeader } from "../../../views/components/section-header";
import { AdAside } from "../components/ads/ad-aside";
import { EventListItem } from "../components/event-list-item";
import PageContentSection from "../../../views/components/page-content-section";
import { AdCenter } from "../components/ads/ad-center";
import { ArticleViewModel } from "../../view-models/article-view-model";
import { cdn } from "ournet.links";
import { marked } from "marked";

export default class ArticlePage extends React.Component<ArticleViewModel> {
  render() {
    const {
      lang,
      head,
      locales,
      links,
      latestEvents,
      article,
      config,
      country,
      project
    } = this.props;

    const imageLargeUrl = cdn.media.image(article.imageId || "", {
      size: "large",
      ext: "webp"
    });

    head.elements.push(
      <meta key="og_type" property="og:type" content="article" />
    );
    head.elements.push(
      <meta key="og_image" property="og:image" content={imageLargeUrl} />
    );
    head.elements.push(
      <meta
        key="published_time"
        property="article:published_time"
        content={article.createdAt}
      />
    );
    head.elements.push(
      <meta
        key="publisher"
        property="article:publisher"
        content={locales.getAppName(project, country)}
      />
    );

    const link = links.news.article(article.slug, article.id, { ul: lang });

    const renderer = new marked.Renderer();
    const linkRenderer = renderer.link;
    if (article.doFollowLinks === true) {
      renderer.link = (href, title, text) => {
        const html = linkRenderer.call(renderer, href, title, text);
        return html.replace(/^<a /, '<a target="_blank" ');
      };
    } else {
      renderer.link = (href, title, text) => {
        const html = linkRenderer.call(renderer, href, title, text);
        return html.replace(/^<a /, '<a target="_blank" rel="nofollow" ');
      };
    }

    const content = marked(article.content?.content || "", {
      renderer
    });

    const createdAt = moment(article.createdAt)
      .tz(config.timezone)
      .locale(lang);

    return (
      <CommonLayout {...this.props}>
        <PageContentSection>
          <main>
            <div className="o-layout">
              <div className="o-layout__item u-4/6@desktop">
                <article className="c-event">
                  <div className={`c-event-media js-media-dialog`}>
                    <img
                      className="c-event-media__pic"
                      alt={article.title}
                      src={cdn.media.image(article.imageId || "", {
                        size: "large"
                      })}
                    />
                  </div>
                  <div className="c-event__body">
                    <div className="o-layout o-layout--small">
                      <div className="o-layout__item u-1/6@tablet"></div>
                      <div className="o-layout__item u-5/6@tablet">
                        <h1 className="c-event__title">
                          <a href={link} title={article.title}>
                            {article.title}
                          </a>
                        </h1>
                        <div className="c-event__stats">
                          <time dateTime={article.createdAt}>
                            {createdAt.format("lll")}
                          </time>
                          {", "}
                          {locales.count_views_format(article.countViews)}
                        </div>
                        <div
                          className="c-event__text"
                          dangerouslySetInnerHTML={{ __html: content }}
                        ></div>
                        <style>
                          {`
                            .c-event__text img {
                              max-width: 100%;
                            }
                            .c-event__text a {
                              font-weight: bold;
                            }
                          `}
                        </style>
                        <br />
                        <hr />
                        {AdCenter()}
                      </div>
                    </div>
                  </div>
                </article>
              </div>
              <div className="o-layout__item u-2/6@desktop">
                {AdAside()}
                <div className="c-section">
                  {SectionHeader({
                    name: locales.latest_events(),
                    link: links.news.home({ ul: lang })
                  })}
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
                          view: "card-bare"
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(){var img=new Image();img.src='${links.news.actions.viewArticle(
                  article.id,
                  { ul: lang }
                )}';}());`
              }}
            ></script>
          </main>
        </PageContentSection>
      </CommonLayout>
    );
  }
}
