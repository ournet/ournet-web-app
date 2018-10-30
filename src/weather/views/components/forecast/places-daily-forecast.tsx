
import * as React from 'react';
import { ForecastHelper } from '@ournet/weather-domain';
import { getPlaceName, toBeaufort } from '../../../../helpers';
import { Sitemap } from 'ournet.links';
import { ForecastIcon } from '../../../../views/components/weather/forecast-icon';
import { ForecastTemp } from '../../../../views/components/weather/forecast-temp';
import { PlaceDailyForecast } from '../../../view-models/places-daily-forecast-model';

export type PlacesDailyForecastProps = {
    lang: string
    links: Sitemap
    reports: PlaceDailyForecast[]
}

export function PlacesDailyForecast({ reports, lang, links }: PlacesDailyForecastProps) {

    return (
        <div className='c-places-daily-forecast' >
            {reports.map(item => (
                <div key={item.place.id} className='dr-row'>
                    <div className='dr-r dr-r-date'>
                        <a href={links.weather.place(item.place.id, { ul: lang })}>{getPlaceName(item.place, lang)}</a>
                    </div>
                    <div className='dr-r dr-r-temp'>
                        {ForecastIcon({ lang, icon: item.forecast.icon })}
                        {ForecastTemp({ temperature: item.forecast.temperature })}
                        <span className='symbol-name'>{ForecastHelper.iconName(item.forecast.icon, lang)}</span>
                    </div>
                    <div className='dr-r dr-r-wind'>
                        <span className={'wind-speed beaufort-' + toBeaufort(item.forecast.windSpeed || 1)}>{item.forecast.windSpeed}</span>
                        <span className='wind-dir'>{item.forecast.windDir}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}
