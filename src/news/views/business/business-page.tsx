import * as React from "react";
import CommonLayout from "../common-layout";
import { PageTitle } from "../../../views/components/page-title";
import PageContentSection from "../../../views/components/page-content-section";
import { ArticleListItem } from "../components/article-list-item";
import { NewsViewModel } from "../../view-models/news-view-model";

export default class BusinessPage extends React.Component<NewsViewModel> {
  render() {
    const {
      lang,
      head,
      locales,
      links,
      latestArticles,
      title,
      subTitle,
      config,
      country
    } = this.props;

    return (
      <CommonLayout {...this.props}>
        <PageContentSection>
          <main>
            {PageTitle({
              title: title || head.title,
              subTitle: subTitle || head.description
            })}

            <div className="o-layout">
              {latestArticles.map((item) => (
                <div
                  key={item.id}
                  className="o-layout__item u-1/2@mobile u-1/3@desktop"
                >
                  {ArticleListItem({
                    lang,
                    country,
                    item,
                    links,
                    timezone: config.timezone,
                    view: "card",
                    imageSize: "large",
                    locales
                  })}
                </div>
              ))}
            </div>
          </main>
        </PageContentSection>
      </CommonLayout>
    );
  }
}
