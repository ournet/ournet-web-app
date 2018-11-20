
import * as React from 'react';
import { PlacesViewModel } from '../../view-models/places-view-model';
import CommonLayout from '../common-layout';
import { BreadcrumbData, Breadcrumb } from '../../../views/components/breadcrumb';
import { getPlaceName } from '../../../helpers';
import { PageTitle } from '../../../views/components/page-title';
import { PlacesList } from './places-list';


export function PlacesPage(props: PlacesViewModel) {

    const { locales, lang, country, links, places, placesAdmin1, head } = props;

    const localeParams = { ul: lang };
    let title = locales.search_place_in_cn_format( { country: locales.getInCountryName(country) });

    const breadcrumbData: BreadcrumbData = {
        items: [
            { text: locales.weather(), url: links.weather.home(localeParams) },
            { text: locales.places(), url: links.weather.places(localeParams) },
        ]
    };

    if (placesAdmin1) {
        breadcrumbData.items.push({
            text: getPlaceName(placesAdmin1, lang),
            url: links.weather.places.byAdm1(placesAdmin1.admin1Code, localeParams)
        })

        title = locales.search_place_in_adm_cn_format(
            { region: getPlaceName(placesAdmin1, lang), country: locales.getCountryName(country) });
    }

    head.title = title;

    return (
        <CommonLayout {...props}>
            <main>
                {Breadcrumb(breadcrumbData)}
                {PageTitle({ title })}
                {places.length === 0
                    ? <div className='c-nodata'>{locales.not_found_places()}</div>
                    : PlacesList({ places, lang, links })}
            </main>
        </CommonLayout>
    )
}
