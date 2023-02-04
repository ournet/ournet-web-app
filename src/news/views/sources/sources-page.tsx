import * as React from "react";
import CommonLayout from "../common-layout";
import { PageTitle } from "../../../views/components/page-title";
import PageContentSection from "../../../views/components/page-content-section";
import { SourcesViewModel } from "../../view-models/sources-view-model";
import { URL } from "url";

export default class SourcesPage extends React.Component<SourcesViewModel> {
  render() {
    const { head, links, title, subTitle, sources, locales, lang } = this.props;

    return (
      <CommonLayout {...this.props}>
        <PageContentSection>
          <main>
            {PageTitle({
              title: title || head.title,
              subTitle: subTitle
            })}
            <hr />
            <div className="c-section">
              <div className="o-layout">
                {sources.map((item) => (
                  <div
                    key={item.id}
                    className="o-layout__item u-1/2@mobile u-1/4@tablet"
                  >
                    <div className="c-source-it">
                      <h6>
                        <a href={links.news.source(item.id, { ul: lang })}>
                          {item.name}
                        </a>
                      </h6>
                      <a
                        className="c-source-it--a"
                        target="_blank"
                        href={item.url}
                      >
                        {new URL(item.url).hostname.replace("www.", "")} &gt;
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <a href="https://github.com/ournet/news-sources" target="_blank">
                + <strong>{locales.add_news_source()}</strong>
              </a>
            </div>
            <hr />
            <br />
          </main>
        </PageContentSection>
      </CommonLayout>
    );
  }
}
