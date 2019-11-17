
import * as React from 'react';
import CommonLayout from '../common-layout';
import { ImageStorageHelper } from '@ournet/images-domain';
import { ItemViewModel } from '../../view-models/item-view-model';
import { FormatArticleContent } from '../components/format-article-content';
import * as moment from 'moment-timezone';
import { ItemMedia } from './item-media';
import { OutReadMoreLink } from '../components/out-read-more';
import { startWithUpperCase } from '../../../helpers';
import { TopicListItem } from '../components/topic-list-item';
import { SectionHeader } from '../../../views/components/section-header';
import { EventListItem } from '../components/event-list-item';
import { AdAside } from '../components/ads/ad-aside';
import PageContentSection from '../../../views/components/page-content-section';

export default class ItemPage extends React.Component<ItemViewModel> {
    render() {
        const { lang, country, head, locales, links, latestEvents, item, config, articleContent, similarEvents, event, project } = this.props;

        let imageLargeUrl: string | null = null;
        if (item.imagesIds) {
            imageLargeUrl = ImageStorageHelper.newsUrl(item.imagesIds[0], 'large', 'jpg');
        }

        head.elements.push(<meta key='og_type' property="og:type" content="article" />);
        if (imageLargeUrl) {
            head.elements.push(<meta key='og_image' property="og:image" content={imageLargeUrl} />);
        }
        head.elements.push(<meta key='published_time' property="article:published_time" content={item.createdAt} />);
        head.elements.push(<meta key='publisher' property="article:publisher" content={locales.getAppName(project, country)} />);
        if (item.topics) {
            for (let tag of item.topics) {
                head.elements.push(<meta key={`tag-${tag.id}`} property="article:tag" content={tag.name} />);
            }
        }

        const link = links.news.item(item.id, { ul: lang });

        const paragraphs = articleContent && FormatArticleContent({ lang, content: articleContent, links, topics: item.topics || [], maxPhrases: 2 })
            || item.summary.split(/\n+/).map((item, index) => <p key={`phrase-s-${index}`}>{item}</p>);

        const createdAt = moment(item.publishedAt).tz(config.timezone).locale(lang);

        return (
            <CommonLayout {...this.props}>
                <PageContentSection>
                    <main>
                        <div className='o-layout'>
                            <div className='o-layout__item u-4/6@desktop'>
                                <article className='c-event'>
                                    {ItemMedia({ event, item, locales, links, lang })}
                                    <div className='c-event__body'>
                                        <div className='o-layout o-layout--small'>
                                            <div className='o-layout__item u-1/6@tablet'>
                                            </div>
                                            <div className='o-layout__item u-5/6@tablet'>
                                                <h1 className='c-event__title'><a href={link} title={item.title}>{item.title}</a></h1>
                                                <div className='c-event__stats'>
                                                    <time dateTime={item.createdAt}>{createdAt.format('lll') + ', '}</time>
                                                    {locales.count_views_format(item.countViews)}
                                                </div>
                                                <div className='c-event__text'>
                                                    {paragraphs}
                                                </div>
                                                <div className='u-clearfix'>
                                                    {OutReadMoreLink({ url: item.urlHost + item.urlPath, source: startWithUpperCase(item.sourceId), links, locales })}
                                                </div>
                                                <hr />
                                                <ul className='c-event__tags'>
                                                    {(item.topics || []).map(item => <li key={item.id}>{TopicListItem({ links, lang, item, view: 'tag' })}</li>)}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </article>

                                {similarEvents && similarEvents.length > 0 ?
                                    <div className='c-section'>{SectionHeader({ name: locales.related_news() })}
                                        <div key='layout' className='o-layout'>
                                            {similarEvents.slice(0, 2).map(item => <div key={item.id} className='o-layout__item u-1/2@mobile'>{EventListItem({ item, lang, links, country, timezone: config.timezone, view: 'card' })}</div>)}
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
                        <script dangerouslySetInnerHTML={{ __html: `(function(){var img=new Image();img.src='${links.news.actions.viewItem(item.id, { ul: lang })}';}());` }}></script>
                    </main>
                </PageContentSection>
            </CommonLayout >
        )
    }
}
