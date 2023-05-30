import * as React from "react";
import { PortalViewModel } from "../view-models/portal-view-model";
import Layout from "./layout";
import { getAssetUrl } from "../../assets";
import env from "../../env";
import PageContentSection from "../../views/components/page-content-section";

export default class CommonLayout extends React.Component<PortalViewModel> {
  render() {
    const { project, children } = this.props;
    return (
      <Layout {...this.props}>
        <PageContentSection>{children}</PageContentSection>
        <script
          async={true}
          src={getAssetUrl(project, "js", "main", env.isProduction)}
        />
      </Layout>
    );
  }
}
