
import * as React from 'react';
import RootLayout from '../../views/root-layout';
import { PortalViewModel } from '../view-models/portal-view-model';
import { AccentLine } from '../../views/components/accent-line';
import { TopicHelper } from '@ournet/topics-domain';
import PageMenu, { PageMenuProps } from '../../views/components/page-menu';
import { PageHeader } from '../../views/components/page-header';
import { PageFooter } from '../../views/components/page-footer';

export default class Layout extends React.Component<PortalViewModel, any> {
    render() {
        const { children, country, trendingTopics, links, lang, currentLink, head } = this.props;

        const pageMenu: PageMenuProps = {
            items: []
        }

        if (trendingTopics && trendingTopics.length) {
            for (const item of trendingTopics) {
                const link = links.news.topic(TopicHelper.parseSlugFromId(item.id), { ul: lang });
                if (currentLink === link || head.canonical === link) {
                    pageMenu.selectedId = item.id;
                }

                pageMenu.items.push({
                    link, id: item.id, title: item.name,
                    text: item.abbr || item.commonName || item.name,
                })
            }
        }

        return (
            <RootLayout {...this.props}>
                {AccentLine()}
                {PageHeader(this.props)}
                {PageMenu(pageMenu)}
                {children}
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
