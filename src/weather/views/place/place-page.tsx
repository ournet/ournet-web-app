
import * as React from 'react';
import { PlaceViewModel } from '../../view-models/place-view-model';
import { getPlaceName } from '../../../helpers';
import { PageTitle } from '../../../views/components/page-title';
import { Share } from '../../../views/components/share';
import { WeatherLocaleNames } from '../../locale';
import { PlaceDailyReport } from '../components/forecast/place-daily-report';
import CommonLayout from '../common-layout';
import { BreadcrumbData, Breadcrumb } from '../../../views/components/breadcrumb';


export function PlacePage(props: PlaceViewModel) {

    const { translate, lang, links, place, placeForecast, holidays, title, subTitle, description, config, head } = props;

    const localeParams = { ul: lang };

    const breadcrumbData: BreadcrumbData = {
        items: [
            { text: translate(WeatherLocaleNames.weather), url: links.weather.home(localeParams) },
        ]
    };

    if (place.admin1) {
        const adm1Name = getPlaceName(place.admin1, lang);
        breadcrumbData.items.push({ text: adm1Name, url: links.weather.places.byAdm1(place.admin1Code, localeParams) });
    }

    const placeName = getPlaceName(place, lang);
    breadcrumbData.items.push({ text: placeName, url: links.weather.place(place.id.toString(), localeParams) });

    return (
        <CommonLayout {...props}>
            <main>
                {Share({ services: config.shareServices, align: 'right', url: head.canonical, lang })}
                {Breadcrumb(breadcrumbData)}
                {PageTitle({ title, subTitle })}

                {PlaceDailyReport({ holidays, report: placeForecast && placeForecast.details, place, lang, config, translate })}
                <p className='c-seo-mute'>{description}</p>
            </main>
        </CommonLayout>
    )
}
