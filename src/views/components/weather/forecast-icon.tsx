
import * as React from 'react';
import { ForecastHelper } from '@ournet/weather-domain';

export type ForecastIconProps = {
    lang: string
    icon: number
}

export function ForecastIcon({ lang, icon }: ForecastIconProps) {
    const title = ForecastHelper.iconName(icon, lang);
    return (
        <i className={`w-icon wi-${icon}`} title={title} />
    )
}
