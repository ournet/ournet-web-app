
import * as React from 'react';
import { Sitemap, getSchema, getHost } from 'ournet.links';
import { TopicHelper } from '@ournet/topics-domain';
import { TrendingTopic } from '../../view-models/news-view-model';
import { OurnetProjectName } from '../../../ournet/data';

export type TrendingTopicsMenuPorps = {
    lang: string
    country: string
    links: Sitemap
    topics: TrendingTopic[]
    project?: OurnetProjectName
}

export function TrendingTopicsMenu({ topics, links, lang, project, country }: TrendingTopicsMenuPorps) {

    if (!topics) {
        return null;
    }

    const urlPrefix = project && project !== OurnetProjectName.NEWS
        ? (getSchema(OurnetProjectName.NEWS, country) + '//' + getHost(OurnetProjectName.NEWS, country))
        : '';

    return (
        <div className='c-trend-menu'>
            <ul className='c-trend-menu__l'>
                <li className='c-trend-menu__trend'></li>
                {topics.map(item => <li className='c-trend-menu__i' key={item.id}><a title={item.name} href={urlPrefix + links.news.topic(TopicHelper.parseSlugFromId(item.id), { ul: lang })}>{item.abbr || item.commonName || item.name}</a></li>)}
            </ul>
        </div>
    );
}
