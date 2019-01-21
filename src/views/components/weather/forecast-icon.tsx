
import * as React from 'react';
import { WeatherHelpers } from '../../../weather/helpers';

export type ForecastIconProps = {
    lang: string
    icon: number
}

export function ForecastIcon({ lang, icon }: ForecastIconProps) {
    const title = WeatherHelpers.iconName(icon, lang);
    return (
        <i className={`w-icon wi-${icon}`} title={title} />
    )
}
