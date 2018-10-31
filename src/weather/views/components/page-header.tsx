
import * as React from 'react';
import { WeatherViewModel } from '../../view-models/weather-view-model';
import { HeaderPlaceForecast } from '../../../views/components/weather/header-place-forecast';
import { WeatherLocaleNames } from '../../locale';
import { HeaderLogo } from '../../../views/components/header-logo';
import { getSchema, getHost } from 'ournet.links';
import { OurnetProjectName } from '../../../ournet/data';
import { HeaderSearch } from './header-search';

export function PageHeader({ capital, capitalForecast, links, translate, lang, country }: WeatherViewModel) {

    const placeForecast = capital && capitalForecast
        ? (HeaderPlaceForecast({ links, lang, country, place: capital, forecast: capitalForecast }))
        : null;

    return (
        <header className='c-header o-layout o-layout--small'>
            <div className='o-layout__item u-2/6 u-1/5@tablet u-1/6@desktop'>
                {HeaderLogo({ url: getSchema(OurnetProjectName.PORTAL, country) + '//' + getHost(OurnetProjectName.PORTAL, country) + links.portal.home({ ul: lang }), title: translate(WeatherLocaleNames.app_name) })}
            </div>
            <div className='o-layout__item u-4/6 u-2/5@tablet'>
                {HeaderSearch({ lang, translate, links })}
            </div>
            <div className='o-layout__item u-2/5@tablet u-hide-mobile u-tr'>
                {placeForecast}
            </div>
        </header>
    )
}
