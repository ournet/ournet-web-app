
import * as React from 'react';
import { PlacesViewModel } from '../../view-models/places-view-model';
import CommonLayout from '../common-layout';
import { WeatherLocaleNames } from '../../locale';
import { LocaleHelpers } from '../../../ournet/locale';
import { BreadcrumbData, Breadcrumb } from '../../../views/components/breadcrumb';
import { getPlaceName } from '../../../helpers';
import { PageTitle } from '../../../views/components/page-title';
import { PlacesList } from './places-list';


export function PlacesPage(props: PlacesViewModel) {

    const { translate, lang, country, links, places, placesAdmin1, head } = props;

    const localeParams = { ul: lang };
    let title = translate(WeatherLocaleNames.search_place_in_cn, { name: LocaleHelpers.getInCountryName(translate, country) });

    const breadcrumbData: BreadcrumbData = {
        items: [
            { text: translate(WeatherLocaleNames.weather), url: links.weather.home(localeParams) },
            { text: translate(WeatherLocaleNames.places), url: links.weather.places(localeParams) },
        ]
    };

    if (placesAdmin1) {
        breadcrumbData.items.push({
            text: getPlaceName(placesAdmin1, lang),
            url: links.weather.places.byAdm1(placesAdmin1.admin1Code, localeParams)
        })

        title = translate(WeatherLocaleNames.search_place_in_cn_format,
            { name1: getPlaceName(placesAdmin1, lang), name2: LocaleHelpers.getCountryName(translate, country) });
    }

    head.title = title;

    return (
        <CommonLayout {...props}>
            <main>
                {Breadcrumb(breadcrumbData)}
                {PageTitle({ title })}
                {places.length === 0
                    ? <div className='c-nodata'>{translate(WeatherLocaleNames.not_found_places)}</div>
                    : PlacesList({ places, lang, links })}
            </main>
        </CommonLayout>
    )
}
