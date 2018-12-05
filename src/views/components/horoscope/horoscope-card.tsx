
import * as React from 'react';
import { getHost, getSchema, Sitemap } from 'ournet.links';
import { HoroscopesHelper, HoroscopeSign } from '@ournet/horoscopes-domain';
import { OurnetProjectName } from '../../../ournet/data';

export type HoroscopeCardProps = {
    title: string
    country: string
    links: Sitemap
    lang: string
    view?: 'wide'
}

export function HoroscopeCard({ title, country, links, lang, view }: HoroscopeCardProps) {

    const host = getSchema(OurnetProjectName.HOROSCOPE, country) + '//' + getHost(OurnetProjectName.HOROSCOPE, country);

    const url = host + links.horoscope.home({ ul: lang });

    const viewClass = view ? ' v--' + view : '';

    return (
        <div className={'c-horo-card' + viewClass}>
            <a className='c-horo-card__title' title={title} href={url}>{title}</a>
            <ul className='c-horo-card__list'>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(id => {
                    const sign = HoroscopesHelper.getSignName(id as HoroscopeSign, lang);
                    if (!sign) {
                        return null;
                    }
                    return (
                        <li key={id}>
                            <a title={sign.name} href={host + links.horoscope.sign(sign.slug, { ul: lang })}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><use href={`#svg-zs-icon-${id}`}></use></svg>
                            </a>
                        </li>
                    )
                })}
            </ul>
        </div >
    )
}
