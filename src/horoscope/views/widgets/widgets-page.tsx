
import * as React from 'react';
import { Share } from '../../../views/components/share';
import { PageTitle } from '../../../views/components/page-title';
import { WidgetsViewModel } from '../../view-models/widget-view-model';
import { getHost } from 'ournet.links';
import { OurnetProjectName } from '../../../ournet/data';
import Layout from '../layout';
import PageContentSection from '../../../views/components/page-content-section';

export function WidgetsPage(props: WidgetsViewModel) {

    const { lang, head, config, title, subTitle, links, locales, country } = props;

    const iframeLink = links.horoscope.widgets.widget1Frame({ ul: lang });
    const host = getHost(OurnetProjectName.HOROSCOPE, country);
    const fullIframeLink = '//' + host + iframeLink;

    const formatHtmlCode = (h: string) => `<iframe src="${fullIframeLink}" frame-border="0" allow-transparency="true" width="100%" height="${h}"></iframe>`;

    return (
        <Layout {...props}>
            <PageContentSection>
                <main>
                    {Share({ services: config.shareServices, lang, align: 'right', url: head.canonical })}
                    {PageTitle({ title: title || head.title, subTitle: subTitle || head.description })}
                    <div className='o-layout'>
                        <div className="o-layout__item u-1/5@tablet">
                            <iframe src={iframeLink} frameBorder={0} allowTransparency={true} width={'100%'} height={'150px'} style={{ maxWidth: "300px" }}></iframe>
                            <h3>{locales.html_code()}:</h3>
                            <textarea style={{ width: "100%" }} rows={5}>
                                {formatHtmlCode('150px')}
                            </textarea>
                            <br />
                        </div>
                        <div className="o-layout__item u-1/5@tablet">
                            <iframe src={iframeLink} frameBorder={0} allowTransparency={true} width={'100%'} height={'350px'}></iframe>
                            <h3>{locales.html_code()}:</h3>
                            <textarea style={{ width: "100%" }} rows={5}>
                                {formatHtmlCode('350px')}
                            </textarea>
                            <br />
                        </div>
                        <div className="o-layout__item u-2/5@tablet">
                            <iframe src={iframeLink} frameBorder={0} allowTransparency={true} width={'100%'} height={'200px'}></iframe>
                            <h3>{locales.html_code()}:</h3>
                            <textarea style={{ width: "100%" }} rows={5}>
                                {formatHtmlCode('200px')}
                            </textarea>
                            <br />
                        </div>
                        <div className="o-layout__item u-1/5@tablet">
                            <iframe src={iframeLink} frameBorder={0} allowTransparency={true} width={'100%'} height={'120px'}></iframe>
                            <h3>{locales.html_code()}:</h3>
                            <textarea style={{ width: "100%" }} rows={5}>
                                {formatHtmlCode('120px')}
                            </textarea>
                            <br />
                        </div>
                    </div>
                </main>
            </PageContentSection>
        </Layout>
    )
}
