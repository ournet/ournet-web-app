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
    const { lang, children, country, config, project } = this.props;

    return (
      <html lang={lang}>
        <PageHead {...this.props} />
        <body className={`proj-${project} country-${country}`}>
          {config.googleAnalyticsId && (
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', '${config.googleAnalyticsId}', '${config.domain}');
ga('set', 'dimension1', '${project}');
ga('send', 'pageview');`
              }}
            ></script>
          )}
          {ShareSvg()}
          {children}
          {getFooterScripts(country)}
        </body>
      </html>
    );
  }
}

function getFooterScripts(country: string) {
  if (country === "ru") {
    return (
      <ins className="u-hidden">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
ym(1353233, "init", {id:1353233,clickmap:false,trackLinks:false,accurateTrackBounce:false});`
          }}
        ></script>
      </ins>
    );
  }

  return null;
}
