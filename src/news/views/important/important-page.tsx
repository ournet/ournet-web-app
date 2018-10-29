
import * as React from 'react';
import CommonLayout from '../common-layout';
import { NewsLocaleNames } from '../../locale';
import { EventListItem } from '../components/event-list-item';
import { QuoteListItem } from '../components/quote-list-item';
import { GroupHeader } from '../../../views/components/group-header';
import { ImportantViewModel } from '../../view-models/important-view-model';
import { Share } from '../../../views/components/share';
import { PageTitle } from '../../../views/components/page-title';
import { AdCenter } from '../components/ads/ad-center';

export default class ImportantPage extends React.Component<ImportantViewModel> {
    render() {
        const { lang, head, translate, links, importantEvents, latestQuotes, title, subTitle, config, country } = this.props;

        head.elements.push(<link key='important-rss' rel="alternate" type="application/rss+xml" title={translate(NewsLocaleNames.important_news)} href={links.news.rss.stories.important({ ul: lang })}></link>);

        const list1 = importantEvents.slice(0, importantEvents.length / 2);
        const list2 = importantEvents.slice(importantEvents.length / 2);

        return (
            <CommonLayout {...this.props}>
                <main>
                    {Share({ lang, url: head.canonical, align: 'right', services: config.shareServices })}
                    {PageTitle({ title: (title || head.title), subTitle: (subTitle || head.description) })}

                    <div className='o-layout'>
                        {list1.map(item => <div key={item.id} className='o-layout__item u-1/2@mobile u-1/3@desktop'>{EventListItem({ lang, country, item, links, timezone: config.timezone, view: 'card', imageSize: 'large' })}</div>)}
                    </div>
                    {AdCenter()}
                    <div className='o-layout'>
                        {list2.map(item => <div key={item.id} className='o-layout__item u-1/2@mobile u-1/3@desktop'>{EventListItem({ lang, country, item, links, timezone: config.timezone, view: 'card', imageSize: 'large' })}</div>)}
                    </div>

                    <div className='c-group'>
                        {GroupHeader({ name: translate(NewsLocaleNames.latest_quotes), link: links.news.quotes({ ul: lang }), type: 'important' })}
                        <div className='o-layout'>
                            {latestQuotes.map(item => <div key={item.id} className='o-layout__item u-1/3@tablet'>{QuoteListItem({ country, lang, links, timezone: config.timezone, item, view: 'card' })}</div>)}
                        </div>
                    </div>
                </main>
            </CommonLayout >
        )
    }
}
