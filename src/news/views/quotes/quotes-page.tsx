
import * as React from 'react';
import CommonLayout from '../common-layout';
import { NewsLocaleNames } from '../../locale';
import { EventListItem } from '../components/event-list-item';
import { QuoteListItem } from '../components/quote-list-item';
import { GroupHeader } from '../../../views/components/group-header';
import { Share } from '../../../views/components/share';
import { PageTitle } from '../../../views/components/page-title';
import { QuotesViewModel } from '../../view-models/quotes-view-model';
import { AdCenter } from '../components/ads/ad-center';

export default class QuotesPage extends React.Component<QuotesViewModel> {
    render() {
        const { lang, head, translate, links, latestEvents, latestQuotes, config, title, subTitle, country } = this.props;

        const list1 = latestQuotes.slice(0, latestQuotes.length / 2);
        const list2 = latestQuotes.slice(latestQuotes.length / 2);

        return (
            <CommonLayout {...this.props}>
                <main>
                    {Share({ lang, url: head.canonical, align: 'right', services: config.shareServices })}
                    {PageTitle({ title: (title || head.title), subTitle: (subTitle || head.description) })}

                    <div className='o-layout'>
                        {list1.map(item => <div key={item.id} className='o-layout__item u-1/3@tablet'>{QuoteListItem({ country, lang, links, timezone: config.timezone, item, view: 'card' })}</div>)}
                    </div>
                    {AdCenter()}
                    <div className='o-layout'>
                        {list2.map(item => <div key={item.id} className='o-layout__item u-1/3@tablet'>{QuoteListItem({ country, lang, links, timezone: config.timezone, item, view: 'card' })}</div>)}
                    </div>

                    <div className='c-group'>
                        {GroupHeader({ name: translate(NewsLocaleNames.latest_events), link: links.news.home({ ul: lang }), type: 'new' })}
                        <div className='o-layout'>
                            {latestEvents.map(item => <div key={item.id} className='o-layout__item u-1/2 u-1/4@tablet'>{EventListItem({ lang, country, item, links, timezone: config.timezone, view: 'card' })}</div>)}
                        </div>
                    </div>
                </main>
            </CommonLayout >
        )
    }
}
