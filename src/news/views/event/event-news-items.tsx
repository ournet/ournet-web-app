
import * as React from 'react';
import { NewsEvent } from '@ournet/api-client';
import { startWithUpperCase, truncateAt } from '../../../helpers';
import { Sitemap } from 'ournet.links';

export type EventNewsItemsProps = {
    links: Sitemap
    event: NewsEvent
    lang: string
}



export function EventNewsItems({ links, event, lang }: EventNewsItemsProps) {

    return (
        <ul className='c-event__items'>
            {event.items.map(item => <li key={item.id}><span>{startWithUpperCase(item.sourceId)}</span> <a title={item.title} href={links.news.item(item.id, { ul: lang })}>{truncateAt(item.title, 100)}</a></li>)}
        </ul>
    );

}
