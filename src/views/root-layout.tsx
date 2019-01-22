
import * as React from 'react';

import { PageViewModel } from '../ournet/page-view-model';
import { OurnetAppConfig } from '../ournet/config';
import { PageHead } from './components/page-head';

export default class RootLayout extends React.Component<PageViewModel<OurnetAppConfig>, any> {
    render() {
        const { lang, children, country, config, project } = this.props;

        return (
            <html lang={lang}>
                <PageHead {...this.props} />
                <body className={`proj-${project} country-${country}`}>
                    <script dangerouslySetInnerHTML={{
                        __html: `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', '${config.googleAnalyticsId}', '${config.domain}');
ga('set', 'dimension1', '${project}');
ga('send', 'pageview');`}}></script>
                    {children}
                </body>
            </html>
        )
    }
}
