import * as React from "react";
import { NewsViewModel } from "../view-models/news-view-model";
import Layout from "./layout";
import { getAssetUrl } from "../../assets";
import env from "../../env";
import { HoroscopeSvg } from "../../views/components/horoscope/horoscope-svg";
import { OurnetProjectName } from "../../ournet/data";

export default class CommonLayout extends React.Component<NewsViewModel> {
  render() {
    const { project, children, containsProject } = this.props;
    return (
      <Layout {...this.props}>
        {containsProject(OurnetProjectName.HOROSCOPE) && HoroscopeSvg()}
        {children}
        <script
          async={true}
          src={getAssetUrl(project, "js", "main", env.isProduction)}
        />
      </Layout>
    );
  }
}
