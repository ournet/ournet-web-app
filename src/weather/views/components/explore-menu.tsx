import * as React from 'react';
import { Place } from '@ournet/api-client';
import { WeatherAppConfig } from '../../config';
import { TranslateFunction, LocaleHelpers } from '../../../ournet/locale';
import { Sitemap } from 'ournet.links';
import { getPlaceName } from '../../../helpers';
import { WeatherLocaleNames } from '../../locale';

export type ExploreMenuProps = {
    canonical?: string
    places: Place[]
    country: string
    lang: string
    config: WeatherAppConfig
    translate: TranslateFunction
    links: Sitemap
}

export function ExploreMenu({lang, country, links, config,translate, places}:ExploreMenuProps){
    const ulParam = { ul: lang };

    return (
        <div className="c-exp">
            <h4 className="c-exp__title">
                <a href={links.weather.home({ ul: lang })}>
                    {LocaleHelpers.getCountryName(translate, country)}
                </a>
            </h4>
            <ul className="c-exp-list">
                {places && places.map(item => {
                    const link = links.weather.place(item.id, ulParam);
                    return <li key={item.id}><a href={link}>{getPlaceName(item, lang)}</a></li>
                })}
                <li key='places-count'>
                    <a href={links.weather.places(ulParam)}>
                        {translate(WeatherLocaleNames.other_n_places_format, config.placesCount)}
                    </a>
                </li>
            </ul>
            {
                config.lists && config.lists.map(list => (
                    <h5 key={list.id} className="c-exp__title">
                        <a href={links.weather.place(list.id, { ul: lang })}>
                            {list.name[lang]} ›
                        </a>
                    </h5>
                ))
            }
        </div>
    );
}
