
import * as React from 'react';
import { IndexViewModel } from '../../view-models/index-view-model';
import CommonLayout from '../common-layout';
import { PortalLocaleNames } from '../../locale';
import { HoroscopeSvg } from '../../../views/components/horoscope/horoscope-svg';
import { HoroscopeCard } from '../../../views/components/horoscope/horoscope-card';
import { GroupHeader } from '../../../views/components/group-header';
import { getSchema, getHost } from 'ournet.links';
import { OurnetProjectName } from '../../../ournet/data';
import { EventListItem } from '../../../news/views/components/event-list-item';
import { QuoteListItem } from '../../../news/views/components/quote-list-item';

export default class IndexPage extends React.Component<IndexViewModel> {
    render() {
        const { lang, head, translate, links, currentDate, latestEvents, country, latestQuotes, config, project } = this.props;

        const newsSchema = getSchema(OurnetProjectName.NEWS, country);
        const newsHost = getHost(OurnetProjectName.NEWS, country);

        const newsUrl = newsSchema + '//' + newsHost;

        head.elements.push(<link key='events-rss' rel="alternate" type="application/rss+xml" title={translate(PortalLocaleNames.events)} href={newsUrl + links.news.rss.stories({ ul: lang })}></link>);
        head.elements.push(<link key='imortant-rss' rel="alternate" type="application/rss+xml" title={translate(PortalLocaleNames.important_news)} href={newsUrl + links.news.rss.stories.important({ ul: lang })}></link>);

        const recentDate = currentDate.clone().add(-12, 'hours').toISOString();

        let recentEvents = latestEvents.filter(item => item.createdAt > recentDate);

        if (recentEvents.length === 0) {
            recentEvents = latestEvents;
        }

        const mainEvent = recentEvents.sort((a, b) => b.countNews - a.countNews)[0];
        const restEvents = latestEvents.filter(item => item.id !== mainEvent.id);

        return (
            <CommonLayout {...this.props}>
                {links.horoscope && HoroscopeSvg()}
                <main>
                    <div className='o-layout'>
                        <div className='o-layout__item u-2/4@tablet'>
                            {EventListItem({ lang, country, links, timezone: config.timezone, imageSize: 'large', view: 'card-wide', item: mainEvent, project })}
                        </div>
                        <div className='o-layout__item u-2/4@tablet'>
                            <div className='o-layout'>
                                {restEvents.slice(0, 2).map(item => <div key={item.id} className='o-layout__item u-1/2@mobile'>{EventListItem({ lang, country, item, links, timezone: config.timezone, view: 'card', project })}</div>)}
                            </div>
                        </div>
                    </div>
                    <div className='o-layout'>
                        <div className='o-layout__item u-1/4@tablet u-1/2@mobile'>
                            {links.horoscope && HoroscopeCard({ links, lang, country, title: translate(PortalLocaleNames.horoscope) })}
                        </div>
                        <div className='o-layout__item u-1/4@tablet u-1/2@mobile'>
                            {restEvents[2] && EventListItem({ lang, country, links, timezone: config.timezone, view: 'card', item: restEvents[2], project })}
                        </div>

                        {restEvents.slice(3, 5).map(item => <div key={item.id} className='o-layout__item u-1/4@tablet u-1/2@mobile'>{EventListItem({ lang, country, item, links, timezone: config.timezone, view: 'card', project })}</div>)}

                    </div>
                    <div className='c-group'>
                        {GroupHeader({ name: translate(PortalLocaleNames.latest_quotes), link: newsUrl + links.news.quotes({ ul: lang }), type: 'important' })}
                        <div className='o-layout'>
                            {latestQuotes.map(item => <div key={item.id} className='o-layout__item u-1/3@tablet'>{QuoteListItem({ lang, country, links, timezone: config.timezone, view: 'card', item, project })}</div>)}
                        </div>
                    </div>
                    <div className='o-layout'>
                        {restEvents.slice(5).map(item => <div key={item.id} className='o-layout__item u-1/2@mobile u-1/4@tablet'>{EventListItem({ lang, country, item, links, timezone: config.timezone, view: 'card', project })}</div>)}
                    </div>
                </main>
            </CommonLayout>
        )
    }
}
