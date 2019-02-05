
import * as React from 'react';
import RootLayout from '../../views/root-layout';
import { WeatherViewModel } from '../view-models/weather-view-model';
import { AccentLine } from '../../views/components/accent-line';
import PageMenu, { PageMenuProps } from '../../views/components/page-menu';
import { getPlaceName } from '../../helpers';
import { PageFooter } from '../../views/components/page-footer';
import { WeatherPageHeader } from './components/page-header';

export default class Layout extends React.Component<WeatherViewModel, any> {
    render() {
        const { children, country, currentLink, head, mainPlaces, links, lang, locales, config } = this.props;

        const pageMenu: PageMenuProps = {
            items: []
        }

        for (const item of pageMenu.items) {
            if (currentLink === item.link || head.canonical === item.link) {
                pageMenu.selectedId = item.id;
                break;
            }
        }

        if (mainPlaces && mainPlaces.length) {
            for (const item of mainPlaces) {
                const link = links.weather.place(item.id, { ul: lang });
                if (currentLink === link || head.canonical === link) {
                    pageMenu.selectedId = item.id;
                }

                const name = getPlaceName(item, lang);

                pageMenu.items.push({
                    link,
                    id: item.id,
                    title: name,
                    text: name,
                })
            }
        }

        const utilLinks = [{ id: 'widget', url: links.weather.widget({ ul: lang }), text: locales.weather_on_your_site() }];
        if (config.lists) {
            config.lists.forEach(item => {
                utilLinks.push({
                    id: item.id,
                    url: links.weather.place(item.id, { ul: lang }),
                    text: item.name[lang],
                })
            })
        }

        return (
            <RootLayout {...this.props}>
                {AccentLine()}
                {WeatherPageHeader(this.props)}
                {PageMenu(pageMenu)}
                {children}
                {PageFooter({ ...this.props, utilLinks })}
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
                            project: 4509755,
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
