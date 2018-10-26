import { Place } from "@ournet/api-client";
import { PlaceHelper } from '@ournet/places-domain';
const standard = require('standard-text');

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
