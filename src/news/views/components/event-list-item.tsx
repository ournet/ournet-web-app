
import * as React from 'react';
import { NewsEvent, NewsTopic } from '@ournet/api-client';
import { ImageStorageHelper, ImageSizeName } from '@ournet/images-domain';
import moment = require('moment-timezone');
import chroma = require('chroma-js');
import { Locale } from '../../../ournet/locale';
import { filterIrrelevantTopics } from '../../irrelevant-topics';
import { getImageColorFromId, truncateAt } from '../../../helpers';
import { Sitemap, getSchema, getHost } from 'ournet.links';
import { OurnetProjectName } from '../../../ournet/data';

export type EventListItemProps = {
    links: Sitemap
    lang: string
    country: string
    timezone: string
    view: EventListItemViewName
    item: NewsEvent
    imageSize?: ImageSizeName
    project?: OurnetProjectName
}

export type EventListItemViewName = 'card' | 'media-left' | 'media-right' | 'card-wide' | 'card-bare';

export function EventListItem(props: EventListItemProps) {
    switch (props.view) {
        case 'media-left':
        case 'media-right': return mediaItemView(props);
        case 'card':
        case 'card-bare':
        case 'card-wide': return cardItemView(props);
    }
    return null;
}

function mediaItemView({ item, imageSize, view, links, lang, country, timezone }: EventListItemProps) {

    const mainTopic = getMainTopic({ lang, country }, item.topics);
    const link = links.news.story(item.slug, item.id, { ul: lang });
    const createdAt = moment(item.createdAt).tz(timezone).locale(lang);

    return (
        <div className={'c-event-it c-event-it--media o-media o-media--small' + (view === 'media-right' ? ' o-media--reverse' : '')}>
            <div className='o-media__img'>
                <span className='c-event-it__img o-lazy' data-src={ImageStorageHelper.eventUrl(item.imageId, imageSize || 'square', 'jpg')}></span>
            </div>
            <div className='c-event-it__info o-media__body'>
                <a className='c-event-it__title' href={link} title={item.title}>{truncateAt(item.title, 80)}</a>
                <div className='c-event-it__stats'>
                    <time dateTime={item.createdAt}>{createdAt.fromNow(true)}</time>
                    <a className='c-event-it__topic' title={mainTopic.name} href={links.news.topic(mainTopic.slug, { ul: lang })}>{mainTopic.abbr || truncateAt(mainTopic.name, 30)}</a>
                </div>
            </div>
        </div>
    )
}

function getMainTopic(locale: Locale, topics: NewsTopic[]) {
    const relevantTopics = filterIrrelevantTopics(locale, topics);
    return relevantTopics.length > 0 ? relevantTopics[0] : topics[0];
}

function cardItemView({ item, imageSize, view, links, lang, country, timezone, project }: EventListItemProps) {

    const mainTopic = getMainTopic({ lang, country }, item.topics);
    const createdAt = moment(item.createdAt).tz(timezone).locale(lang);

    const color = chroma('#' + getImageColorFromId(item.imageId));
    const luminance = color.luminance();
    const colorClass = luminance > 0.30 ? ' c-event-it__black' : '';
    const orientation = ['card-wide', 'card-bare'].includes(view) ? 'to left' : 'to bottom';

    const showSummary = view !== 'card-bare';

    const urlPrefix = project && project !== OurnetProjectName.NEWS
        ? (getSchema(OurnetProjectName.NEWS, country) + '//' + getHost(OurnetProjectName.NEWS, country))
        : '';

    return (
        <div className={'c-event-it v--card' + colorClass + (view !== 'card' ? ' v--' + view : '')} style={{ backgroundColor: color.hex() }}>
            <div className='c-event-it__media'>
                <div className='c-event-it__img o-lazy' data-src={ImageStorageHelper.eventUrl(item.imageId, imageSize || 'medium', 'jpg')}></div>
                <div className='c-event-it__img-mask' style={{ backgroundImage: `linear-gradient(${orientation},rgba(0,0,0,0),rgba(${color.rgb()},.7),rgb(${color.rgb()}));` }}></div>
            </div>
            <div className='c-event-it__hover'></div>

            <a className='c-event-it__doc' title={item.title} href={urlPrefix + links.news.story(item.slug, item.id, { ul: lang })}>
                <div className='c-event-it__inner'>
                    <h3 className='c-event-it__title'>{truncateAt(item.title, 80)}</h3>
                    {showSummary && <div className='c-event-it__summary'>{truncateAt(item.summary, 120)}</div>}
                </div>
            </a>
            <div className='c-event-it__stats'>
                <time dateTime={item.createdAt}>{createdAt.fromNow(true)}</time>
                <a className='c-event-it__topic' title={mainTopic.name} href={urlPrefix + links.news.topic(mainTopic.slug, { ul: lang })}>{mainTopic.abbr || truncateAt(mainTopic.name, 30)}</a>
            </div>
        </div>
    )
}
