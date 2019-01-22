import * as React from 'react';
import { OurnetAppConfig } from '../../ournet/config';
import { PageViewModel } from '../../ournet/page-view-model';
import env from '../../env';
import { getAssetUrl } from '../../assets';
import { getAppIconUrl } from '../../helpers';

export function PageHead({ config, head, lang, country, project, showGoogleAds }: PageViewModel<OurnetAppConfig>) {

    return (
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimal-ui" />
            <title>{head.title}</title>
            {head.description && <meta name="description" content={head.description} />}
            {head.canonical && <link rel="canonical" href={head.canonical} />}
            <link rel='shortcut icon' href={getAppIconUrl(config.domain, 'favicon.ico')} type='image/x-icon' />
            <link rel='apple-touch-icon' href={getAppIconUrl(config.domain, 'apple-touch-icon.png')} />
            <link key='1' type="text/css" rel="stylesheet" href={getAssetUrl(project, 'css', 'main', env.isProduction)} />
            {head.elements}
            <link rel="dns-prefetch" href="//assets.ournetcdn.net" />
            <link rel="dns-prefetch" href="//ajax.googleapis.com" />
            <link rel="dns-prefetch" href="//tpc.googlesyndication.com" />
            <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
            <script dangerouslySetInnerHTML={{ __html: `window.CONSTANTS={lang:"${lang}",country:"${country}"};` }}></script>
            {!config.disabledAds && showGoogleAds && <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>}
        </head>
    )
}
