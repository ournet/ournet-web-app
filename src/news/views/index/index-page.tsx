
import * as React from 'react';
import { IndexViewModel } from '../../view-models/index-view-model';
import CommonLayout from '../common-layout';
import { NewsLocaleNames } from '../../locale';
import { EventListItem } from '../components/event-list-item';

export default class IndexPage extends React.Component<IndexViewModel> {
    render() {
        const { lang, head, translate, links, currentDate, latestEvents } = this.props;

        head.elements.push(<link key='events-rss' rel="alternate" type="application/rss+xml" title={translate(NewsLocaleNames.events)} href={links.news.rss.stories({ ul: lang })}></link>);
        head.elements.push(<link key='imortant-rss' rel="alternate" type="application/rss+xml" title={translate(NewsLocaleNames.important_news)} href={links.news.rss.stories.important({ ul: lang })}></link>);

        const recentDate = currentDate.clone().add(-12, 'hours').toISOString();

        let recentEvents = latestEvents.filter(item => item.createdAt > recentDate);

        if (!recentEvents.length) {
            recentEvents = latestEvents;
        }

        const mainEvent = recentEvents.sort((a, b) => b.countNews - a.countNews)[0];
        const restEvents = latestEvents.filter(item => item.id !== mainEvent.id);

        return (
            <CommonLayout {...this.props}>
                <main>
                    <div className='o-layout'>
                        <div className='o-layout__item u-2/4@tablet'>
                            {EventListItem({ root: this.props, imageSize: 'large', view: 'card-wide', item: mainEvent })}
                        </div>
                        <div className='o-layout__item u-2/4@tablet'>
                            <div className='o-layout'>
                                {restEvents.slice(0, 2).map(item => <div key={item.id} className='o-layout__item u-1/2@mobile'>{EventListItem({ root: this.props, view: 'card', item })}</div>)}
                            </div>
                        </div>
                    </div>
                    <div className='o-layout'>
                        <div className='o-layout__item u-1/4@tablet u-1/2@mobile'>
                            {/* <HoroscopeCard {...this.props} /> */}
                        </div>
                        <div className='o-layout__item u-1/4@tablet u-1/2@mobile'>
                            {EventListItem({ root: this.props, view: 'card', item:restEvents[2] })}
                        </div>

                        {restEvents.slice(3, 5).map(item => <div key={item.id} className='o-layout__item u-1/4@tablet u-1/2@mobile'>{EventListItem({ root: this.props, view: 'card', item })}</div>)}

                    </div>
                    <div className='c-group'>
                        {/* <GroupHeader name={__(LocalesNames.latest_quotes)} link={links.news.quotes({ ul: lang })} type='important' /> */}
                        <div className='o-layout'>
                            {/* {latestQuotes.map(item => <div key={item.id} className='o-layout__item u-1/3@tablet'><QuoteListItem root={this.props} item={item} view='card' /></div>)} */}
                        </div>
                    </div>
                    <div className='o-layout'>
                        {restEvents.slice(5).map(item => <div key={item.id} className='o-layout__item u-1/2@mobile u-1/4@tablet'>{EventListItem({ root: this.props, view: 'card', item })}</div>)}
                    </div>
                </main>
            </CommonLayout >
        )
    }
}
