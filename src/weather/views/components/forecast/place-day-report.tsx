
import * as React from 'react';
import { Place, HoursForecastDataBlock, PublicHoliday } from '@ournet/api-client';
import * as moment from 'moment-timezone';
import { ForecastHelper } from '@ournet/weather-domain';
import { TranslateFunction } from '../../../../ournet/locale';
import { ForecastIcon } from '../../../../views/components/weather/forecast-icon';
import { ForecastTemp } from '../../../../views/components/weather/forecast-temp';
import { toBeaufort, unixTime } from '../../../../helpers';
import { WeatherLocaleNames } from '../../../locale';


export type PlaceDayReportProps = {
    translate: TranslateFunction
    lang: string
    place: Place
    report: HoursForecastDataBlock
    filter: boolean
    holidays: PublicHoliday[]
}

export function PlaceDayReport({ place, report, lang, translate, filter, holidays }: PlaceDayReportProps) {

    const timezone = place.timezone;
    const dayDate = moment(report.data[report.data.length - 1].time * 1000).tz(timezone).locale(lang);

    let data = report.data;
    if (filter) {
        const currentUnixTime = moment().tz(timezone).unix();
        data = data.filter(item => item.time >= currentUnixTime);
    }
    const isWeekend = [6, 7].includes(dayDate.isoWeekday());

    const dayTime = getDayUnixTime(report.data[report.data.length - 1].time);

    const todayHolidays = holidays.filter(item => item.date >= dayTime.start && item.date < dayTime.end);

    const items = data.map((item, index) => {
        const date = moment(item.time * 1000).tz(timezone);
        // const nextDate = index < data.length - 1 ? moment(data[index + 1].time * 1000).tz(timezone) : undefined;
        const symbolName = ForecastHelper.iconName(item.icon, lang);
        return (
            <div key={index} className='dr-row'>
                <div className='dr-r dr-r-date'>{date.format('HH:00')}</div>
                <div className='dr-r dr-r-temp'>
                    {ForecastIcon({icon:item.icon, lang})}
                    {ForecastTemp({temperature:item.temperature})}
                    <span className='symbol-name'>{symbolName}</span>
                </div>
                <div className='dr-r dr-r-wind'>
                    <span className={'wind-speed beaufort-' + toBeaufort(item.windSpeed || 1)}>{item.windSpeed}</span>
                    <span className='wind-dir'>{item.windDir}</span>
                </div>
                <div className='dr-r dr-r-hum'>{(Math.round((item.humidity || 0) * 100)) + '%'}</div>
            </div>
        );
    });

    return (
        <div className='day-report' >
            <div className={'dr-caption' + (isWeekend ? ' weekend' : '')}>
                <div className='dr-c-date'>
                    {dayDate.format('dddd') + ' , ' + dayDate.format('D MMMM')}
                </div>
            </div>
            <div className='dr-head'>
                <div className='dr-h dr-h-date'>{translate(WeatherLocaleNames.report_hour)}</div>
                <div className='dr-h dr-h-temp'>{translate(WeatherLocaleNames.temperature) + ' °C'}</div>
                <div className='dr-h dr-h-wind'>{translate(WeatherLocaleNames.wind)}, {translate(WeatherLocaleNames.item_wind_speed_ms)}</div>
                <div className='dr-h dr-h-hum'>{translate(WeatherLocaleNames.humidity)}</div>
            </div>
            <div className='dr-body'>
                {items}
            </div>
            {todayHolidays.length > 0 &&
                <div className='dr-footer'>
                    {todayHolidays.map(item => <div key={item.date}>{item.name}</div>)}
                </div>}
        </div>
    )
}

function getDayUnixTime(unix: number) {
    const date = new Date(unix * 1000);
    date.setUTCHours(0, 0, 0, 0);

    const start = unixTime(date);
    date.setUTCDate(date.getUTCDate() + 1);
    const end = unixTime(date);

    return { start, end };
}
