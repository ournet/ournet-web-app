
import * as React from 'react';
import RootLayout from '../../views/root-layout';
import { HoroscopeViewModel } from '../view-models/horoscope-view-model';
import { AccentLine } from '../../views/components/accent-line';
import { HoroscopeSvg } from '../../views/components/horoscope/horoscope-svg';
import { PageHeader } from '../../views/components/page-header';
import { PageFooter } from '../../views/components/page-footer';

export default class Layout extends React.Component<HoroscopeViewModel, any> {
    render() {
        const { children, country, links, lang, locales, project, config, version, head } = this.props;

        return (
            <RootLayout {...this.props}>
                {HoroscopeSvg()}
                {AccentLine()}
                {PageHeader(this.props)}
                {children}
                {PageFooter({ lang, country, locales, project, config, version, head, utilLinks: [{ id: 'widgets', url: links.horoscope.widgets({ ul: lang }), text: locales.horo_on_your_site() }] })}
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
                            project: 4509759,
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
