import * as React from 'react';
import { Sitemap } from 'ournet.links';
import { TranslateFunction } from '../../../ournet/locale';
import { WeatherLocaleNames } from '../../locale';

export type HeaderSearchProps = {
    links: Sitemap
    translate: TranslateFunction
    lang: string
}

export function HeaderSearch({ links, lang, translate }: HeaderSearchProps) {

    return (
        <form method='get' className='c-search' action={links.weather.search({ ul: lang })}>
            <input type='text' name='q' className='c-search__input' placeholder={translate(WeatherLocaleNames.search_text)} />
            <button type='submit' className='c-search__btn' />
        </form>
    )
}