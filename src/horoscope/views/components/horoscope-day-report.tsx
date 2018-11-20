
import * as React from 'react';
import { HoroscopeReport } from '@ournet/api-client';
import { HoroscopesHelper, HoroscopeSign } from '@ournet/horoscopes-domain';
import { Sitemap } from 'ournet.links';
import { formatSignDates, encodeReportText } from '../../helpers';
import { OurnetLocales } from '../../../locales';


export type HoroscopeDayReportProps = {
    lang: string
    links: Sitemap
    locales: OurnetLocales
    report: HoroscopeReport
    date?: string
    footer?: boolean
}

export function HoroscopeDayReport({ date, report, locales, lang, links, footer }: HoroscopeDayReportProps) {

    const sign = HoroscopesHelper.getSignName(report.sign as HoroscopeSign, lang);

    if (!sign) {
        return null;
    }

    return (
        <div className='c-report'>
            {date ? <div className='c-report__date'>{date}</div> : null}
            <a className='c-report__head' href={links.horoscope.sign(sign.slug, { ul: lang })}>
                <div className='c-report__icon'>
                    <div className='c-zs-icon'>
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                            <use href={"#svg-zs-icon-" + report.sign}></use>
                        </svg>
                    </div>
                    <h4>{sign.name}</h4>
                    <div className='c-report__dates'>{formatSignDates(report.sign, locales.horo_sign_date_format(), lang)}</div>
                </div>
            </a>
            <div className='c-report__body'>
                <div className='c-report__text' dangerouslySetInnerHTML={{ __html: encodeReportText(report.text) }}></div>
                {footer && <div className='c-report__footer'><div className='c-report__numbers'>{locales.lucky_numbers()}: {report.numbers.map((no, i) => <span key={i}>{no}</span>)}</div></div>}
            </div>
        </div >
    )
}
