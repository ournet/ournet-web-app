import * as React from 'react';
import { Place, HoursForecastDataBlock, HoursForecastDataPoint, PublicHoliday } from '@ournet/api-client';
import * as moment from 'moment-timezone';
import { WeatherAppConfig } from '../../../config';
import { PlaceDayReport } from './place-day-report';
import { AdTop } from '../ads/ad-top';
import { SubscribeBar } from '../subscribe-bar';
import { AdCenter } from '../ads/ad-center';
import { OurnetLocales } from '../../../../locales';

export type PlaceDailyReportPorps = {
    lang: string
    locales: OurnetLocales
    config: WeatherAppConfig
    place: Place
    report?: HoursForecastDataBlock
    holidays: PublicHoliday[]
}

export function PlaceDailyReport({ place, report, locales, lang, config, holidays }: PlaceDailyReportPorps) {

    const daysData: HoursForecastDataPoint[][] = []


    if (!report || !report.data) {
        return <div className='c-nodata'>{locales.forecast_no_data()}</div>
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

    const currentDate = moment().tz(timezone);
    const firstDayData = Array.from(daysData[0]);
    if (moment(firstDayData[firstDayData.length - 1].time * 1000).tz(timezone).date() < currentDate.date()) {
        daysData.shift();
    }

    const items: (JSX.Element | null)[] = []

    daysData.forEach((dayData, index) => {
        if (index === 1) {
            if (!config.disabledAds) {
                items.push(AdTop())
            }
        }
        else if (index === 2) {
            items.push(SubscribeBar({ locales, config, lang, place }))
        }
        else if (index === 5) {
            if (!config.disabledAds) {
                items.push(AdCenter())
            }
        }
        items.push(PlaceDayReport({ lang, locales, holidays, filter: index === 0, place, report: { icon: 0, data: dayData } }));
    })

    return (
        <div className='c-daily-report'>
            {items}
        </div>
    )
}
