
import * as React from 'react';
import CommonLayout from '../common-layout';
import { EventViewModel } from '../../view-models/event-view-model';
import { ImageStorageHelper } from '@ournet/images-domain';
import * as moment from 'moment-timezone';
import { OutReadMoreLink } from '../components/out-read-more';
import { startWithUpperCase } from '../../../helpers';
import { FormatArticleContent } from '../components/format-article-content';
import { SectionHeader } from '../../../views/components/section-header';
import { AdAside } from '../components/ads/ad-aside';
import { EventMedia } from './event-media';
import { QuoteListItem } from '../components/quote-list-item';
import { TopicListItem } from '../components/topic-list-item';
import { EventListItem } from '../components/event-list-item';
import PageContentSection from '../../../views/components/page-content-section';
import { HoroscopeCard } from '../../../views/components/horoscope/horoscope-card';
import { AdCenter } from '../components/ads/ad-center';

export default class EventPage extends React.Component<EventViewModel> {
    render() {
        const { lang, head, locales, links, latestEvents, event, config, eventContent, eventQuotes, similarEvents, country, project } = this.props;

        const imageLargeUrl = ImageStorageHelper.eventUrl(event.imageId, 'large', 'jpg');

        head.elements.push(<meta key='og_type' property="og:type" content="article" />);
        head.elements.push(<meta key='og_image' property="og:image" content={imageLargeUrl} />);
        head.elements.push(<meta key='published_time' property="article:published_time" content={event.createdAt} />);
        head.elements.push(<meta key='publisher' property="article:publisher" content={locales.getAppName(project, country)} />);
        for (let tag of event.topics) {
            head.elements.push(<meta key={`tag-${tag.id}`} property="article:tag" content={tag.name} />);
        }

        const link = links.news.story(event.slug, event.id, { ul: lang });

        const paragraphs = eventContent && FormatArticleContent({ lang, content: eventContent, links, topics: event.topics, maxPhrases: 3 })
            || event.summary.split(/\n+/).map((item, index) => <p key={`phrase-s-${index}`}>{item}</p>);

        const createdAt = moment(event.createdAt).tz(config.timezone).locale(lang);

        return (
            <CommonLayout {...this.props}>
                <PageContentSection>
                    <main>
                        <div className='o-layout'>
                            <div className='o-layout__item u-4/6@desktop'>
                                <article className='c-event'>
                                    {EventMedia({ event, locales, links, lang })}
                                    <div className='c-event__body'>
                                        <div className='o-layout o-layout--small'>
                                            <div className='o-layout__item u-1/6@tablet'>
                                            </div>
                                            <div className='o-layout__item u-5/6@tablet'>
                                                <h1 className='c-event__title'><a href={link} title={event.title}>{event.title}</a></h1>
                                                <div className='c-event__stats'>
                                                    <time dateTime={event.createdAt}>{createdAt.format('lll')}</time>
                                                    {', ' + locales.count_news_format(event.countNews) + ', '}
                                                    {locales.count_views_format(event.countViews)}
                                                </div>
                                                <div className='c-event__text'>
                                                    {paragraphs}
                                                </div>
                                                <div className='u-clearfix'>
                                                    {OutReadMoreLink({ url: event.source.host + event.source.path, source: startWithUpperCase(event.source.sourceId), links, locales })}
                                                </div>
                                                {eventQuotes && <div className='c-event_quotes'>{eventQuotes.map(item => QuoteListItem({ item, view: 'card', country, lang, links, timezone: config.timezone, shareServices: config.shareServices }))}</div>}
                                                {/* <hr />
                                                {EventNewsItems({ lang, event, links })} */}
                                                <hr />
                                                <ul className='c-event__tags'>
                                                    {event.topics.map(item => <li key={item.id}>{TopicListItem({ links, lang, item, view: 'tag' })}</li>)}
                                                </ul>
                                                {AdCenter}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                                {similarEvents.length > 0 ?
                                    <div className='c-section'>
                                        {SectionHeader({ name: locales.related_news() })}
                                        <div key='slayout' className='o-layout'>
                                            {similarEvents.slice(0, 2).map(item => <div key={item.id} className='o-layout__item u-1/2@mobile'>{EventListItem({ lang, country, item, links, timezone: config.timezone, view: 'card' })}</div>)}
                                            <div className='o-layout__item u-1/2@mobile'>{similarEvents.length === 1 && HoroscopeCard({ title: locales.horoscope(), links, lang, country })}</div>
                                        </div>
                                    </div> : null
                                }
                            </div>
                            <div className='o-layout__item u-2/6@desktop'>
                                {AdAside()}
                                <div className='c-section'>
                                    {SectionHeader({ name: locales.latest_events(), link: links.news.home({ ul: lang }) })}
                                    <div className='o-layout o-layout--small'>
                                        {latestEvents.map(item => <div key={item.id} className='o-layout__item u-1/2@tablet u-1/1@desktop'>{EventListItem({ lang, country, item, links, timezone: config.timezone, view: 'card-bare' })}</div>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <script dangerouslySetInnerHTML={{ __html: `(function(){var img=new Image();img.src='${links.news.actions.viewStory(event.id, { ul: lang })}';}());` }}></script>
                    </main>
                </PageContentSection>
            </CommonLayout >
        )
    }
}
