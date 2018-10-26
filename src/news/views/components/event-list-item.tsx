
import * as React from 'react';
import { NewsEvent, NewsTopic } from '@ournet/api-client';
import { ImageStorageHelper, ImageSizeName } from '@ournet/images-domain';
import moment = require('moment-timezone');
import chroma = require('chroma-js');
import { Locale } from '../../../ournet/locale';
import { filterIrrelevantTopics } from '../../irrelevant-topics';
import { getImageColorFromId, truncateAt } from '../../../helpers';
import { NewsViewModel } from '../../view-models/news-view-model';

export type EventListItemProps = {
    root: NewsViewModel
    view: EventListItemViewName
    item: NewsEvent
    imageSize?: ImageSizeName
}

export type EventListItemViewName = 'card' | 'media-left' | 'media-right' | 'card-wide';

export function EventListItem(props: EventListItemProps){
    switch (props.view) {
        case 'media-left':
        case 'media-right': return mediaItemView(props);
        case 'card':
        case 'card-wide': return cardItemView(props);
    }
    return null;
}

function mediaItemView(props: EventListItemProps) {
    const { item, root, imageSize, view } = props;
    const { links, lang, country, config } = root;
    const mainTopic = getMainTopic({ lang, country }, item.topics);
    const link = links.news.story(item.slug, item.id, { ul: lang });
    const createdAt = moment(item.createdAt).tz(config.timezone).locale(lang);

    return (
        <div className={'c-event-it c-event-it--media o-media o-media--small' + (view === 'media-right' ? ' o-media--reverse' : '')}>
            <div className='o-media__img'>
                <span className='c-event-it__img o-lazy' data-src={ImageStorageHelper.eventUrl(item.imageId, imageSize || 'square')}></span>
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

function cardItemView(props: EventListItemProps) {
    const { item, root, imageSize } = props;
    const { links, lang, config, country } = root;
    const mainTopic = getMainTopic({ lang, country }, item.topics);
    const createdAt = moment(item.createdAt).tz(config.timezone).locale(lang);

    const color = chroma('#' + getImageColorFromId(item.imageId));
    const luminance = color.luminance();
    const colorClass = luminance > 0.30 ? ' c-event-it__black' : '';
    const orientation = props.view === 'card-wide' ? 'to left' : 'to bottom';

    return (
        <div className={'c-event-it c-event-it--card' + colorClass + (props.view === 'card-wide' ? ' c-event-it--card-wide' : '')} style={{ backgroundColor: color.hex() }}>
            <div className='c-event-it__media'>
                <div className='c-event-it__img o-lazy' data-src={ImageStorageHelper.eventUrl(item.imageId, imageSize || 'medium')}></div>
                <div className='c-event-it__img-mask' style={{ backgroundImage: `linear-gradient(${orientation},rgba(0,0,0,0),rgba(${color.rgb()},.7),rgb(${color.rgb()}));` }}></div>
            </div>
            <div className='c-event-it__hover'></div>

            <a className='c-event-it__doc' title={item.title} href={links.news.story(item.slug, item.id, { ul: lang })}>
                <div className='c-event-it__inner'>
                    <h3 className='c-event-it__title'>{truncateAt(item.title, 80)}</h3>
                    <div className='c-event-it__summary'>{truncateAt(item.summary, 120)}</div>
                </div>
            </a>
            <div className='c-event-it__stats'>
                <time dateTime={item.createdAt}>{createdAt.fromNow(true)}</time>
                <a className='c-event-it__topic' title={mainTopic.name} href={links.news.topic(mainTopic.slug, { ul: lang })}>{mainTopic.abbr || truncateAt(mainTopic.name, 30)}</a>
            </div>
        </div>
    )
}
