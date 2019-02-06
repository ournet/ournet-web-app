import * as React from 'react';
import { Sitemap } from 'ournet.links';
import { OurnetLocales } from '../../../locales';

export type SavePlaceLabelProps = {
    links: Sitemap
    locales: OurnetLocales
    lang: string
    placeId: string
    placeName: string
}

export function SavePlaceLabel({ locales, placeId }: SavePlaceLabelProps) {
    return (
        <span className='c-place-pin js-place-pin' data-place-id={placeId}>{locales.save()}</span>
    )
}