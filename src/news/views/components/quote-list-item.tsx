
import * as React from 'react';
import { Quote } from '@ournet/api-client';
import moment = require('moment-timezone');
import { Sitemap, getSchema, getHost } from 'ournet.links';
import { truncateAt, entipicUrl } from '../../../helpers';
import { OurnetProjectName } from '../../../ournet/data';
import { getPersonDisplayName } from '../../helpers';

export type QuoteListItemProps = {
    timezone: string
    lang: string
    country: string
    links: Sitemap
    view: QuoteListItemViewName
    item: Quote
    maxLength?: number
    project?: OurnetProjectName
}

export type QuoteListItemViewName = 'card';

export function QuoteListItem(props: QuoteListItemProps) {
    switch (props.view) {
        case 'card': return cardItemView(props);
    }
    return null;
}


function cardItemView({ item, maxLength, timezone, lang, country, links, project }: QuoteListItemProps) {
    const createdAt = moment(item.createdAt).tz(timezone).locale(lang);
    const author = item.author;

    const urlPrefix = project && project !== OurnetProjectName.NEWS
        ? (getSchema(OurnetProjectName.NEWS, country) + '//' + getHost(OurnetProjectName.NEWS, country))
        : '';

    return (
        <div className='c-quote-it c-quote-it--card'>
            <div className='c-quote-it__text' tabIndex={0}><i>“</i> {truncateAt(item.text, maxLength || 500)}</div>
            <div className='c-quote-it__media'>
                <div className='c-quote-it__icon o-lazy' data-src={entipicUrl(author.name, 'a', lang, country)}></div>
                <div className='c-quote-it__body'>
                    <a className='c-quote-it__name' title={author.name} href={urlPrefix + links.news.topic(author.slug, { ul: lang })}>{getPersonDisplayName(author.name, lang)}</a>,
                    <time dateTime={createdAt.toISOString()}> {createdAt.fromNow(true)}</time>
                    <div className='c-quote-it__ctx'>{truncateAt(item.source.title, 60)}</div>
                </div>
            </div>
        </div>
    )
}
