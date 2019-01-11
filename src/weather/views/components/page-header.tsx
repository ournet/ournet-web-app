
import * as React from 'react';
import { WeatherViewModel } from '../../view-models/weather-view-model';
import { HeaderPlaceForecast } from '../../../views/components/weather/header-place-forecast';
import { HeaderLogo } from '../../../views/components/header-logo';
import { getSchema, getHost } from 'ournet.links';
import { OurnetProjectName } from '../../../ournet/data';
import { HeaderSearch } from './header-search';

export function PageHeader({ capital, capitalForecast, links, locales, lang, country, project, containsProject }: WeatherViewModel) {

    const placeForecast = capital && capitalForecast
        ? (HeaderPlaceForecast({ links, lang, country, place: capital, forecast: capitalForecast }))
        : null;

    const logoUrl = containsProject(OurnetProjectName.PORTAL)
        ? getSchema(OurnetProjectName.PORTAL, country) + '//' + getHost(OurnetProjectName.PORTAL, country) + links.portal.home({ ul: lang })
        : links.weather.home({ ul: lang });


    return (
        <header className='c-header o-layout o-layout--small'>
            <div className='o-layout__item u-2/6 u-1/6@tablet'>
                {HeaderLogo({ url: logoUrl, title: locales.getAppName(project, country) })}
            </div>
            <div className='o-layout__item u-4/6 u-3/6@tablet'>
                {HeaderSearch({ lang, locales, links })}
            </div>
            <div className='o-layout__item u-2/6@tablet u-hide-mobile u-tr'>
                {placeForecast}
            </div>
        </header>
    )
}
