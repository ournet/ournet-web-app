
import * as React from 'react';
import CommonLayout from '../common-layout';
import { EventViewModel } from '../../view-models/event-view-model';
import { ImageStorageHelper } from '@ournet/images-domain';
import { NewsLocaleNames } from '../../locale';
import * as moment from 'moment-timezone';
import { OutReadMoreLink } from '../components/out-read-more';
import { startWithUpperCase } from '../../../helpers';
import { FormatArticleContent } from '../components/format-article-content';
import { Share } from '../../../views/components/share';
import { SectionHeader } from '../../../views/components/section-header';
import { AdAside } from '../components/ads/ad-aside';
import { EventMedia } from './event-media';
import { EventNewsItems } from './event-news-items';
import { QuoteListItem } from '../components/quote-list-item';
import { TopicListItem } from '../components/topic-list-item';
import { EventListItem } from '../components/event-list-item';

export default class EventPage extends React.Component<EventViewModel> {
    render() {
        const { lang, head, translate, links, latestEvents, event, config, eventContent, eventQuotes, similarEvents, country } = this.props;

        const imageLargeUrl = ImageStorageHelper.eventUrl(event.imageId, 'large', 'jpg');

        head.elements.push(<meta key='og_type' property="og:type" content="article" />);
        head.elements.push(<meta key='og_image' property="og:image" content={imageLargeUrl} />);
        head.elements.push(<meta key='published_time' property="article:published_time" content={event.createdAt} />);
        head.elements.push(<meta key='publisher' property="article:publisher" content={translate(NewsLocaleNames.app_name)} />);
        for (let tag of event.topics) {
            head.elements.push(<meta key={`tag-${tag.id}`} property="article:tag" content={tag.name} />);
        }

        const link = links.news.story(event.slug, event.id, { ul: lang });

        const paragraphs = eventContent && FormatArticleContent({ lang, content: eventContent, links, topics: event.topics, maxPhrases: 3 })
            || event.summary.split(/\n+/).map((item, index) => <p key={`phrase-s-${index}`}>{item}</p>);

        const createdAt = moment(event.createdAt).tz(config.timezone).locale(lang);

        return (
            <CommonLayout {...this.props}>
                <main>
                    <div className='o-layout'>
                        <div className='o-layout__item u-4/6@desktop'>
                            <article className='c-event'>
                                {EventMedia({ event, translate })}
                                <div className='c-event__body'>
                                    <div className='o-layout o-layout--small'>
                                        <div className='o-layout__item u-1/6@tablet'>
                                        </div>
                                        <div className='o-layout__item u-5/6@tablet'>
                                            <h1 className='c-event__title'><a href={link} title={event.title}>{event.title}</a></h1>
                                            {Share({ url: head.canonical, align: 'right', services: config.shareServices, lang: lang })}
                                            <div className='c-event__stats'>
                                                <time dateTime={event.createdAt}>{createdAt.format('lll')}</time>
                                                {', ' + translate(NewsLocaleNames.news_count, event.countNews) + ', '}
                                                {translate(NewsLocaleNames.count_views_format, event.countViews)}
                                            </div>
                                            <div className='c-event__text'>
                                                {paragraphs}
                                            </div>
                                            {OutReadMoreLink({ url: event.source.host + event.source.path, source: startWithUpperCase(event.source.sourceId), links, translate })}
                                            {eventQuotes && <div className='c-event_quotes'>{eventQuotes.map(item => QuoteListItem({ item, view: 'card', country, lang, links, timezone: config.timezone }))}</div>}
                                            <hr />
                                            {EventNewsItems({ lang, event, links })}
                                            <hr />
                                            <ul className='c-event__tags'>
                                                {event.topics.map(item => <li key={item.id}>{TopicListItem({ links, lang, item, view: 'tag' })}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </article>
                            {similarEvents.length > 0 ?
                                <div className='c-section'>
                                    {SectionHeader({ name: translate(NewsLocaleNames.related_news) })}
                                    <div key='slayout' className='o-layout'>
                                        {similarEvents.slice(0, 2).map(item => <div key={item.id} className='o-layout__item u-1/2@mobile'>{EventListItem({ lang, country, item, links, timezone: config.timezone, view: 'card' })}</div>)}
                                    </div>
                                </div> : null
                            }
                        </div>
                        <div className='o-layout__item u-2/6@desktop'>
                            {AdAside()}
                            <div className='c-section'>
                                {SectionHeader({ name: translate(NewsLocaleNames.latest_events), link: links.news.home({ ul: lang }) })}
                                <ul className='o-list-bare'>
                                    {latestEvents.map(item => <li key={item.id} className='o-list-bare__item'>{EventListItem({ lang, country, item, links, timezone: config.timezone, view: 'media-left' })}</li>)}
                                </ul>
                                {/* <div className='o-layout o-layout--small'>
                                    {latestEvents.map(item => <div key={item.id} className='o-layout__item u-1/2@mobile'><EventListItem root={this.props} item={item} view='card' /></div>)}
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <script dangerouslySetInnerHTML={{ __html: `(function(){var img=new Image();img.src='${links.news.actions.viewStory(event.id, { ul: lang })}';}());` }}></script>
                </main>
            </CommonLayout >
        )
    }
}
