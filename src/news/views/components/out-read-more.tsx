
import * as React from 'react';
import { Sitemap } from 'ournet.links';
import { TranslateFunction } from '../../../ournet/locale';
import { NewsLocaleNames } from '../../locale';

export type OutReadMoreProps = {
    url: string
    links: Sitemap
    translate: TranslateFunction
    source: string
}

export function OutReadMoreLink({ links, url, translate, source }: OutReadMoreProps) {
    return (
        <div className='c-out'><a target='_blank' rel='nofollow noindex' href={links.news.url({ url })}>{translate(NewsLocaleNames.read_more_on_source, { name: source })} ›</a></div>
    )
}
