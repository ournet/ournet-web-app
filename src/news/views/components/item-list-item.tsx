
import * as React from 'react';
import { NewsItem } from '@ournet/api-client';
import moment = require('moment-timezone');
import { Sitemap } from 'ournet.links';
import { truncateAt } from '../../../helpers';

export type ItemListItemProps = {
    links: Sitemap
    lang: string
    timezone: string
    view: ItemListItemViewName
    item: NewsItem
}

export type ItemListItemViewName = 'tline';

export function NewsItemListItem(props: ItemListItemProps) {
    switch (props.view) {
        case 'tline': return timeLineItemView(props);
    }
    return null;
}

function timeLineItemView({ links, lang, timezone, item }: ItemListItemProps) {
    const createdAt = moment(item.publishedAt).tz(timezone).locale(lang);

    return (
        <div className='c-item-it c-item-it--tline'>
            <time dateTime={createdAt.toISOString()}>{createdAt.fromNow(true)}</time>
            <a title={item.title} target="_blank" rel="nofollow noindex" href={links.news.item(item.id, { ul: lang })}>{truncateAt(item.title, 90)}</a>
        </div>
    )
}
