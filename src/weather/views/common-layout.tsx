import * as React from 'react';
import { WeatherViewModel } from '../view-models/weather-view-model';
import Layout from './layout';
import { getAssetUrl } from '../../assets';
import env from '../../env';
import { AdAside } from './components/ads/ad-aside';
import { getSchema, getHost } from 'ournet.links';
import { OurnetProjectName } from '../../ournet/data';
import { EventListItem } from '../../news/views/components/event-list-item';
import { SectionHeader } from '../../views/components/section-header';
import { HoroscopeSvg } from '../../views/components/horoscope/horoscope-svg';
import { GroupHeader } from '../../views/components/group-header';
import { HoroscopeSignsLine } from '../../views/components/horoscope/horoscope-signs-line';
import PageContentSection from '../../views/components/page-content-section';

export default class CommonLayout extends React.Component<WeatherViewModel> {
    render() {
        const { project, children, lang, country, config, locales, links, latestNews, containsProject } = this.props;
        return (
            <Layout {...this.props}>
                {containsProject(OurnetProjectName.HOROSCOPE) && HoroscopeSvg()}
                <PageContentSection>
                    <div className="o-layout">
                        <div className="o-layout__item u-4/6@tablet">
                            {children}
                            {
                                containsProject(OurnetProjectName.HOROSCOPE) &&
                                <div className='c-group'>
                                    {GroupHeader({ name: locales.horoscope(), link: getSchema(OurnetProjectName.HOROSCOPE, country) + '//' + getHost(OurnetProjectName.HOROSCOPE, country) + links.horoscope.home({ ul: lang }) })}
                                    {HoroscopeSignsLine({ lang, links, project, country })}
                                </div>
                            }
                            {
                                (config.facebookPageUrl && config.facebookAppId) &&
                                <div className='c-fb-plike'>
                                    <iframe className='o-lazy' data-src={`https://www.facebook.com/plugins/like.php?href=${encodeURIComponent(config.facebookPageUrl)}&width=450&layout=standard&action=like&size=small&show_faces=true&share=true&height=80&appId=${config.facebookAppId}`} width="450" height="80" style={{ border: 'none', overflow: 'hidden' }} scrolling="no" frameBorder="0" allow="encrypted-media"></iframe>
                                </div>
                            }
                        </div>
                        <div className="o-layout__item u-2/6@tablet">
                            {!config.disabledAds && AdAside()}
                            <div className="c-ad"><div key="SC_TBlock_673203" id="SC_TBlock_673203" className="SC_TBlock"></div></div>
                            {latestNews && latestNews.length > 0 &&
                                <div className='c-section'>
                                    {SectionHeader({ name: locales.latest_news(), link: getSchema(OurnetProjectName.NEWS, country) + '//' + getHost(OurnetProjectName.NEWS, country) + links.news.home({ ul: lang }) })}
                                    <div className="o-layout o-layout--small">
                                        {latestNews.map(item => <div key={item.id} className='o-layout__item'>{EventListItem({ lang, country, project, links, timezone: config.timezone, item, view: 'card-bare', imageSize: 'small' })}</div>)}
                                    </div>
                                </div>}
                        </div>
                    </div>
                </PageContentSection>
                <script async={true} src={getAssetUrl(project, 'js', 'main', env.isProduction)} />
            </Layout>
        )
    }
}
