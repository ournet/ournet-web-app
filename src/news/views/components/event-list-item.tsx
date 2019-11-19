
import * as React from 'react';
import { NewsEvent, NewsTopic } from '@ournet/api-client';
import { ImageStorageHelper, ImageSizeName } from '@ournet/images-domain';
import moment = require('moment-timezone');
import { filterIrrelevantTopics } from '../../irrelevant-topics';
import { truncateAt } from '../../../helpers';
import { Sitemap, getSchema, getHost } from 'ournet.links';
import { OurnetProjectName } from '../../../ournet/data';
import { Locale } from '../../../locales';
import { topicDisplayName } from '../../helpers';

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

function mediaItemView({ item, imageSize, view, links, lang }: EventListItemProps) {
  const link = links.news.story(item.slug, item.id, { ul: lang });

  return (
    <div className={'c-event-it c-event-it--media o-media o-media--small' + (view === 'media-right' ? ' o-media--reverse' : '')}>
      <div className='o-media__img'>
        <span className='c-event-it__img o-lazy' data-src={ImageStorageHelper.eventUrl(item.imageId, imageSize || 'square', 'jpg')}></span>
      </div>
      {item.countVideos > 0 && <i className='c-event-it__vi'></i>}
      <div className='c-event-it__info o-media__body'>
        <a className='c-event-it__title' href={link} title={item.title}>{truncateAt(item.title, 80)}</a>
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

  // const color = chroma('#' + getImageColorFromId(item.imageId));
  // const luminance = color.luminance();
  // const colorClass = luminance > 0.30 ? ' c-event-it__black' : '';
  // const orientation = ['card-wide', 'card-bare'].includes(view) ? 'to left' : 'to bottom';
  // const showSummary = view === 'card-wide';

  const urlPrefix = project && project !== OurnetProjectName.NEWS
    ? (getSchema(OurnetProjectName.NEWS, country) + '//' + getHost(OurnetProjectName.NEWS, country))
    : '';

  return (
    <div className={'c-event-it v--card' + (view !== 'card' ? ' v--' + view : '')}>
      <div className='c-event-it__media'>
        <div className='c-event-it__img o-lazy' data-src={ImageStorageHelper.eventUrl(item.imageId, imageSize || 'medium', 'jpg')}></div>
      </div>
      <div className='c-event-it__hover'></div>
      {item.countVideos > 0 && <i className='c-event-it__vi'></i>}

      <a className='c-event-it__doc' title={item.title} href={urlPrefix + links.news.story(item.slug, item.id, { ul: lang })}>
        <div className='c-event-it__inner'>
          <h3 className='c-event-it__title'>{truncateAt(item.title, 100)}</h3>
        </div>
      </a>
      {view !== 'card-bare' &&
        <div className='c-event-it__stats'>
          <time dateTime={item.createdAt}>{createdAt.fromNow(true)}</time>
          <a className='c-event-it__topic' title={mainTopic.name} href={urlPrefix + links.news.topic(mainTopic.slug, { ul: lang })}>{mainTopic.abbr || truncateAt(topicDisplayName(mainTopic, lang), 30)}</a>
        </div>
      }
    </div>
  )
}
