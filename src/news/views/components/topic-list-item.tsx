
import * as React from 'react';
import { NewsTopic } from '@ournet/api-client';
import { Sitemap } from 'ournet.links';
import { topicDisplayName } from '../../helpers';

export type TopicListItemProps = {
    links: Sitemap
    lang: string
    view: TopicListItemViewName
    item: NewsTopic
}

export type TopicListItemViewName = 'tag';

export function TopicListItem(props: TopicListItemProps) {
    switch (props.view) {
        case 'tag': return tagItemView(props);
    }
    return null;
}

function tagItemView(props: TopicListItemProps) {
    const { item, links, lang } = props;

    return (
        <a className='c-topic-it c-topic-it--tag' title={item.name} href={links.news.topic(item.slug, { ul: lang })}>{item.abbr || topicDisplayName(item, lang)}</a>
    )
}
