import * as React from "react";
import { OurnetAppConfig } from "../../ournet/config";
import { PageViewModel } from "../../ournet/page-view-model";
import env from "../../env";
import { getAssetContent } from "../../assets";
import { getAppIconUrl } from "../../helpers";

export function PageHead({
  config,
  head,
  lang,
  country,
  project,
  showGoogleAds
}: PageViewModel<OurnetAppConfig>) {
  let verificationMeta = null;

  const hasAds = !config.disabledAds && showGoogleAds;

  return (
    <head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,maximum-scale=2,minimal-ui"
      />
      <title>{head.title}</title>
      {head.description && (
        <meta name="description" content={head.description} />
      )}
      {head.canonical && <link rel="canonical" href={head.canonical} />}
      <link rel="dns-prefetch" href="//assets.ournetcdn.net" />
      {hasAds && (
        <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
      )}
      <link rel="preconnect" href="//assets.ournetcdn.net" />
      <link
        rel="shortcut icon"
        href={getAppIconUrl(config.domain, "favicon.ico")}
        type="image/x-icon"
      />
      <link
        rel="apple-touch-icon"
        href={getAppIconUrl(config.domain, "apple-touch-icon.png")}
      />
      <style
        dangerouslySetInnerHTML={{
          __html: getAssetContent(project, "css", "main", env.isProduction)
        }}
      ></style>
      {config.facebookAppId && (
        <meta property="fb:app_id" content={config.facebookAppId} />
      )}
      {verificationMeta}
      {head.elements}
      <script
        dangerouslySetInnerHTML={{
          __html: `window.CONSTANTS={lang:"${lang}",country:"${country}",domain:"${config.domain}"};`
        }}
      ></script>
      {config.googleTagId && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${config.googleTagId}`}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}gtag('js', new Date());
gtag('config', '${config.googleTagId}');`
            }}
          ></script>
        </>
      )}
    </head>
  );
}
