import * as React from 'react';
import { Place, HoursForecastDataBlock, HoursForecastDataPoint, PublicHoliday } from '@ournet/api-client';
import * as moment from 'moment-timezone';
import { TranslateFunction } from '../../../../ournet/locale';
import { WeatherAppConfig } from '../../../config';
import { WeatherLocaleNames } from '../../../locale';
import { PlaceDayReport } from './place-day-report';
import { AdTop } from '../ads/ad-top';
import { SubscribeBar } from '../subscribe-bar';
import { AdCenter } from '../ads/ad-center';

export type PlaceDailyReportPorps = {
    lang: string
    translate: TranslateFunction
    config: WeatherAppConfig
    place: Place
    report?: HoursForecastDataBlock
    holidays: PublicHoliday[]
}

export function PlaceDailyReport({ place, report, translate, lang, config, holidays }: PlaceDailyReportPorps) {

    const daysData: HoursForecastDataPoint[][] = []


    if (!report || !report.data) {
        return <div className='c-nodata'>{translate(WeatherLocaleNames.forecast_no_data)}</div>
    }

    const timezone = place.timezone;
    let lastDay = -1;

    report.data.forEach(item => {
        let list = daysData[daysData.length - 1] || [];
        const date = moment(item.time * 1000).tz(timezone);
        if (lastDay !== date.date()) {
            list = [];
            daysData.push(list);
        }
        list.push(item);
        lastDay = date.date();
    });

    const items: (JSX.Element | null)[] = []

    daysData.forEach((dayData, index) => {
        if (index === 1) {
            items.push(AdTop())
        }
        else if (index === 2) {
            items.push(SubscribeBar({ translate, config, lang, place }))
        }
        else if (index === 5) {
            items.push(AdCenter())
        }
        items.push(PlaceDayReport({ lang, translate, holidays, filter: index === 0, place, report: { icon: 0, data: dayData } }));
    })

    return (
        <div className='c-daily-report'>
            {items}
        </div>
    )
}