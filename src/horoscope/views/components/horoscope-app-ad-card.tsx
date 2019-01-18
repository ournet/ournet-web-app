
import * as React from 'react';

export type HoroscopeAppAdCardProps = {
    lang: string
}

export function HoroscopeAppAdCard({ lang }: HoroscopeAppAdCardProps) {

    return (
        <div className='c-app-ad'>
            <a className='c-app-ad__link' href="https://play.google.com/store/apps/details?id=com.ournet.horoscope" target="_blank">
                <img alt="Google Play" src={`https://play.google.com/intl/en_us/badges/images/generic/${lang}_badge_web_generic.png`} />
            </a>
        </div>
    )
}
