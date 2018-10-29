import { Place } from "@ournet/api-client";
import { PlaceHelper } from '@ournet/places-domain';
import { Dictionary } from "@ournet/domain";
const standard = require('standard-text');
const ellipsize = require('ellipsize');
const entipicUrlFn = require('entipic.url');

export function entipicUrl(name: string, size?: 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | string, lang?: string, country?: string): string {
    return entipicUrlFn(name, size, lang, country)
}

export function truncateAt(text: string, maxLength: number): string {
    return ellipsize(text, maxLength, { truncate: false });
}

const COUNTRY_NAMES = require('../data/country-names.json') as Dictionary<Dictionary<string>>;

export function getPlaceName(place: Place, lang: string): string {
    const key = '_name_' + lang;
    const anyPlace = place as any;
    if (anyPlace[key]) {
        return anyPlace[key];
    }
    const name = place.names ?
        PlaceHelper.parseNames(place.names || '').find(item => item.lang === lang)
        : null;
    if (name && name.name) {
        return anyPlace[key] = standard(name.name, lang);
    }
    return anyPlace[key] = standard(place.name, lang);
}

export function getCountryName(country: string, lang: string) {
    return COUNTRY_NAMES[country][lang];
}

export function getImageColorFromId(imageId: string) {
    return imageId.split(/-/g)[1];
}

export function startWithUpperCase(text: string) {
    if (text) {
        text = text[0].toUpperCase() + text.substr(1);
    }
    return text;
}
