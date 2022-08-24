import * as React from "react";
import RootLayout from "../../views/root-layout";
import { PortalViewModel } from "../view-models/portal-view-model";
import { AccentLine } from "../../views/components/accent-line";
import { TopicHelper } from "@ournet/topics-domain";
import PageMenu, { PageMenuProps } from "../../views/components/page-menu";
import { PageHeader } from "../../views/components/page-header";
import { PageFooter } from "../../views/components/page-footer";
import { resolveProjectLinkPrefix } from "../../helpers";
import { OurnetProjectName } from "../../ournet/data";

export default class Layout extends React.Component<PortalViewModel, any> {
  render() {
    const { children, country, trendingTopics, links, lang, project } =
      this.props;

    const pageMenu: PageMenuProps = {
      items: []
    };

    if (trendingTopics && trendingTopics.length) {
      for (const item of trendingTopics) {
        const link =
          resolveProjectLinkPrefix(project, OurnetProjectName.NEWS, country) +
          links.news.topic(TopicHelper.parseSlugFromId(item.id), { ul: lang });
        pageMenu.items.push({
          link,
          id: item.id,
          title: item.name,
          text: item.abbr || item.commonName || item.name
        });
      }
    }

    return (
      <RootLayout {...this.props}>
        {AccentLine()}
        {PageHeader(this.props)}
        {PageMenu(pageMenu)}
        {children}
        {PageFooter(this.props)}
      </RootLayout>
    );
  }
}
