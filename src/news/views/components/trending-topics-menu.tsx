
import * as React from 'react';
import { Sitemap } from 'ournet.links';
import {TopicHelper} from '@ournet/topics-domain';
import { TrendingTopic } from '../../view-models/news-view-model';

export type TrendingTopicsMenuPorps = {
    lang: string
    links: Sitemap
    topics: TrendingTopic[]
}

export function TrendingTopicsMenu({ topics, links, lang }: TrendingTopicsMenuPorps) {

    return (
        <div className='c-trend-menu'>
            <ul className='c-trend-menu__l'>
                <li className='c-trend-menu__trend'></li>
                {topics.map(item => <li className='c-trend-menu__i' key={item.id}><a title={item.name} href={links.news.topic(TopicHelper.parseSlugFromId(item.id), { ul: lang })}>{item.abbr || item.name}</a></li>)}
            </ul>
        </div>
    );
}
