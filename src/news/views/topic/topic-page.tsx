
import * as React from 'react';
import CommonLayout from '../common-layout';
import { TopicViewModel } from '../../view-models/topic-view-model';
import { entipicUrl } from '../../../helpers';
// import { Share } from '../../../views/components/share';
import { PageTitle } from '../../../views/components/page-title';
import { SectionHeader } from '../../../views/components/section-header';
import { EventListItem } from '../components/event-list-item';
import { QuoteListItem } from '../components/quote-list-item';
import { NewsItemListItem } from '../components/item-list-item';
import { AdCenter } from '../components/ads/ad-center';
import { StickyTitle } from '../../../views/components/sticky-title';

export default class TopicPage extends React.Component<TopicViewModel> {
    render() {
        const { lang, head, country, locales, links, latestEvents, topic, slug, displayName, config, topicEvents, topicNews, aboutQuotes, byQuotes } = this.props;

        const commonName = topic.commonName || topic.name;
        const title = locales.topic_news_title_format({ name: displayName });

        head.elements.push(<link key='topic-rss' rel="alternate" type="application/rss+xml" title={title} href={links.news.rss.stories.topic(slug, { ul: lang })}></link>);



        return (
            <CommonLayout {...this.props}>
                <main>
                    {StickyTitle({ title, url: head.canonical || '', lang, shareServices: config.shareServices, size: 'large' })}
                    <div className='o-layout'>
                        <div className='o-layout__item u-3/5@tablet c-topic'>
                            <div className='o-media c-topic-h'>
                                <div className='o-media__img'>
                                    <img className='c-topic-h__img' src={entipicUrl(topic.name, 'b', lang, country)} alt={topic.name} />
                                </div>
                                <div className='o-media__body'>
                                    {/* {Share({ lang, url: head.canonical, align: 'right', services: config.shareServices })} */}
                                    {PageTitle({ title: (title || head.title), subTitle: head.description })}
                                    {/* <div className='c-topic_h__about'>{topic.description || topic.about && truncateAt(topic.about, 100)}</div> */}
                                </div>
                            </div>
                            {topicNews.length > 0 ? <div className='c-section'>
                                <hr />
                                {topicNews.map(item => NewsItemListItem({ lang, links, timezone: config.timezone, item, view: 'tline' }))}
                                <hr />
                            </div> : null}
                            {topicEvents.length > 0 ?
                                <div className='c-section'>
                                    {SectionHeader({ name: (topic.abbr || commonName) + ' - ' + locales.latest_events(), h: "h4" })}
                                    <div className='o-layout'>
                                        {topicEvents.map(item => <div key={item.id} className='o-layout__item u-1/2'>{EventListItem({ lang, country, item, links, timezone: config.timezone, view: 'card' })}</div>)}
                                    </div>
                                </div>
                                : null
                            }
                            {AdCenter()}
                        </div>
                        <div className='o-layout__item u-2/5@tablet'>
                            {byQuotes && byQuotes.length > 0 ? <div>
                                {SectionHeader({ name: locales.quotes_by_author_format({ name: topic.abbr || commonName }), h: "h4" })}
                                {byQuotes.map(item => QuoteListItem({ lang, country, links, timezone: config.timezone, view: 'card', item }))}
                            </div> : null}
                            {/* {adAside()} */}
                            {aboutQuotes && aboutQuotes.length > 0 ? <div>
                                {SectionHeader({ name: locales.quotes_about_format({ name: topic.abbr || commonName }), h: "h4" })}
                                {aboutQuotes.map(item => QuoteListItem({ lang, country, links, timezone: config.timezone, view: 'card', item }))}
                            </div> : null}
                        </div>
                    </div>

                    <div className='c-section'>
                        {SectionHeader({ name: locales.latest_events() })}
                        <div className='o-layout'>
                            {latestEvents && latestEvents.map(item => <div key={item.id} className='o-layout__item u-1/2@mobile u-1/4@tablet'>{EventListItem({ lang, country, item, links, timezone: config.timezone, view: 'card' })}</div>)}
                        </div>
                    </div>

                </main>
            </CommonLayout >
        )
    }
}
