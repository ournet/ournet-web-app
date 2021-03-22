import * as React from "react";
import { IndexViewModel } from "../../view-models/index-view-model";
import CommonLayout from "../common-layout";
import { PageTitle } from "../../../views/components/page-title";
import { ForecastBrowser } from "../components/forecast/forecast-browser";
import { Share } from "../../../views/components/share";

export class IndexPage extends React.Component<IndexViewModel> {
  render() {
    const { head, placeIds, currentDate, locales, lang, config } = this.props;

    return (
      <CommonLayout {...this.props}>
        <main>
          {PageTitle({
            title: head.title,
            subTitle: head.description,
            preSubTitle: Share({
              url: head.canonical,
              lang,
              services: config.shareServices,
              align: "right"
            })
          })}
          {ForecastBrowser({
            places: placeIds,
            today: currentDate,
            days: 5,
            locales
          })}
        </main>
      </CommonLayout>
    );
  }
}
