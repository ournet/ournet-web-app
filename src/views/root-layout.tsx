import * as React from "react";

import { PageViewModel } from "../ournet/page-view-model";
import { OurnetAppConfig } from "../ournet/config";
import { PageHead } from "./components/page-head";
import { ShareSvg } from "./components/share-svg";

export default class RootLayout extends React.Component<
  PageViewModel<OurnetAppConfig>,
  any
> {
  render() {
    const { lang, children, country, project, config, showGoogleAds } =
      this.props;
    const hasAds = !config.disabledAds && showGoogleAds;

    return (
      <html lang={lang}>
        <PageHead {...this.props} />
        <body className={`proj-${project} country-${country}`}>
          {ShareSvg()}
          {children}
          {hasAds && (
            <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3959589883092051"
              crossOrigin="anonymous"
            ></script>
          )}
        </body>
      </html>
    );
  }
}
