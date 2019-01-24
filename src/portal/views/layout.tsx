
import * as React from 'react';
import RootLayout from '../../views/root-layout';
import { PortalViewModel } from '../view-models/portal-view-model';
import { AccentLine } from '../../views/components/accent-line';
import { PageHeader } from './components/page-header';
import { PageFooter } from './components/page-footer';

export default class Layout extends React.Component<PortalViewModel, any> {
    render() {
        const { children, country } = this.props;

        return (
            <RootLayout {...this.props}>
                {AccentLine()}
                <div className='o-wrapper o-wrapper--small'>
                    {PageHeader(this.props)}
                    {children}
                </div>
                {PageFooter(this.props)}
                {getFooterScripts(country)}
            </RootLayout>
        )
    }
}

function getFooterScripts(country: string) {
    if (country === 'ru') {
        return (
            <ins>
                <script dangerouslySetInnerHTML={{
                    __html: `(function (w, d, c) {
                    (w[c] = w[c] || []).push(function() {
                        var options = {
                            project: 2677032,
                        };
                        try {
                            w.top100Counter = new top100(options);
                        } catch(e) { }
                    });
                    var n = d.getElementsByTagName("script")[0],
                    s = d.createElement("script"),
                    f = function () { n.parentNode.insertBefore(s, n); };
                    s.type = "text/javascript";
                    s.async = true;
                    s.src =
                    (d.location.protocol == "https:" ? "https:" : "http:") +
                    "//st.top100.ru/top100/top100.js";

                    if (w.opera == "[object Opera]") {
                    d.addEventListener("DOMContentLoaded", f, false);
                } else { f(); }
                })(window, document, "_top100q");`}}>
                </script>
            </ins>
        )
    }

    return null;
}
