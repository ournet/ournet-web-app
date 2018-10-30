
import * as React from 'react';
import { Moment } from 'moment-timezone';
import { TranslateFunction } from '../../../../ournet/locale';
import { WeatherLocaleNames } from '../../../locale';


export type ForecastBrowserProps = {
    places: string[]
    today: Moment
    days: number
    translate: TranslateFunction
}


export function ForecastBrowser({ places, days, today, translate }: ForecastBrowserProps) {

    const dates: Moment[] = [today];
    for (let i = 1; i < days; i++) {
        dates.push(today.clone().add(i, 'd'));
    }

    return (
        <div className='c-forbro' data-ids={places.join(',')}>
            <ul className='c-forbro__tabs'>
                {dates.map((date, index) => (<li key={index} className={index === 0 ? 'c-forbro__tabs--selected' : ''} data-date={date.toISOString().substr(0, 10)}>{index === 0 ? translate(WeatherLocaleNames.today) : date.format('dddd')}</li>))}
            </ul>
            <div className='c-forbro__content'>
            </div>
        </div>
    )
}
