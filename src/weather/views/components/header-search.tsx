import * as React from 'react';
import { Sitemap } from 'ournet.links';
import { OurnetLocales } from '../../../locales';

export type HeaderSearchProps = {
    links: Sitemap
    locales: OurnetLocales
    lang: string
}

export function HeaderSearch({ links, lang, locales }: HeaderSearchProps) {

    return (
        <form method='get' className='c-search' action={links.weather.search({ ul: lang })}>
            <input type='text' name='q' className='c-search__input' placeholder={locales.search_place()} />
            <button type='submit' className='c-search__btn' />
        </form>
    )
}