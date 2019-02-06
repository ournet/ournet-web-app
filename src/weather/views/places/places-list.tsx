
import * as React from 'react';
import { Place } from "@ournet/api-client";
import { Sitemap } from 'ournet.links';
import { WeatherPlaceHelper } from '../../place-helper';
import { getPlaceName } from '../../../helpers';

export type PlacesListProps = {
    lang: string
    links: Sitemap
    places: Place[]
    ref?: string
}

export function PlacesList({ lang, places, links, ref }: PlacesListProps) {

    const linkParams = { ul: lang };

    const items = places.map(place => {
        let link: JSX.Element
        let adm1: JSX.Element | null = null;
        if (place.featureClass === 'A') {
            link = <a href={links.weather.places.byAdm1(place.admin1Code, linkParams)}>{getPlaceName(place, lang)}</a>
        } else {
            link = <a href={links.weather.place(place.id.toString(), linkParams) + (ref ? '#ref-' + ref : '')}>{getPlaceName(place, lang)}</a>
            if (place.admin1) {
                adm1 = <div>{WeatherPlaceHelper.shortAdm1Name(place.admin1, lang)}</div>
            }
        }
        return (
            <div key={place.id} className='c-places-list__i o-layout__item u-1/2 u-1/3@tablet'>
                {link}
                {adm1}
            </div>
        );
    })

    return (
        <div className='o-layout o-layout--small c-places-list'>
            {items}
        </div>
    )
}
