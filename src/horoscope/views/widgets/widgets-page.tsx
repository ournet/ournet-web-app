
import * as React from 'react';
import { Share } from '../../../views/components/share';
import { PageTitle } from '../../../views/components/page-title';
import { WidgetsViewModel } from '../../view-models/widgets-view-model';
import { getHost } from 'ournet.links';
import { OurnetProjectName } from '../../../ournet/data';
import Layout from '../layout';
import PageContentSection from '../../../views/components/page-content-section';
import { FacebookScript } from '../../../views/components/facebook-script';
import { getAssetUrl } from '../../../assets';
import env from '../../../env';

export function WidgetsPage(props: WidgetsViewModel) {

    const { lang, head, config, title, subTitle, links, locales, country, project } = props;

    const iframeLink = links.horoscope.widgets.widget1Frame({ ul: lang });
    const host = getHost(OurnetProjectName.HOROSCOPE, country);
    const fullIframeLink = '//' + host + iframeLink;

    const formatHtmlCode = (h: string) => `<iframe src="${fullIframeLink}" frameborder="0" width="100%" height="${h}"></iframe>`;

    return (
        <Layout {...props}>
            <PageContentSection>
                <main>
                    {Share({ services: config.shareServices, lang, align: 'right', url: head.canonical })}
                    {PageTitle({ title: title || head.title, subTitle: subTitle || head.description })}
                    <style dangerouslySetInnerHTML={{
                        __html: `
                    textarea {width:100%;border-radius:3px;}
                    h4{margin-top:6px;}
                    `}}></style>
                    <div className='o-layout'>
                        <div className="o-layout__item u-1/5@tablet">
                            <iframe src={iframeLink} frameBorder={0} width={'100%'} height={'150px'} style={{ maxWidth: "300px" }}></iframe>
                            <h4>{locales.html_code()}:</h4>
                            <textarea rows={5} defaultValue={formatHtmlCode('150px')}>
                            </textarea>
                            <br />
                        </div>
                        <div className="o-layout__item u-1/5@tablet">
                            <iframe src={iframeLink} frameBorder={0} width={'100%'} height={'350px'}></iframe>
                            <h4>{locales.html_code()}:</h4>
                            <textarea rows={5} defaultValue={formatHtmlCode('350px')}></textarea>
                            <br />
                        </div>
                        <div className="o-layout__item u-2/5@tablet">
                            <iframe src={iframeLink} frameBorder={0} width={'100%'} height={'200px'}></iframe>
                            <h4>{locales.html_code()}:</h4>
                            <textarea rows={5} defaultValue={formatHtmlCode('200px')}></textarea>
                            <br />
                        </div>
                        <div className="o-layout__item u-1/5@tablet">
                            <iframe src={iframeLink} frameBorder={0} width={'100%'} height={'120px'}></iframe>
                            <h4>{locales.html_code()}:</h4>
                            <textarea rows={5} defaultValue={formatHtmlCode('120px')}></textarea>
                            <br />
                        </div>
                    </div>
                    <br />
                    <div className='o-layout'>
                        <div className='o-layout__item u-1/5@tablet'></div>
                        <div className='o-layout__item u-3/5@tablet'>
                            <div className='fb-comments' data-href={head.canonical} data-numposts="5" data-width="100%" data-order-by="reverse-time"></div>
                        </div>
                        <div className='o-layout__item u-1/5@tablet'></div>
                    </div>
                    <br />
                    {config.facebookAppId && FacebookScript(config.facebookAppId, lang, country)}
                </main>
            </PageContentSection>
            <script async={true} src={getAssetUrl(project, 'js', 'main', env.isProduction)} />
        </Layout>
    )
}
