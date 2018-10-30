
import * as React from 'react';
import { WeatherLocaleNames } from '../../locale';
import { getSchema, getHost } from 'ournet.links';
import { getCountryName } from '../../../helpers';
import { Share } from '../../../views/components/share';
import { WeatherViewModel } from '../../view-models/weather-view-model';

export function PageFooter({ project, links, translate, lang, config, country, version, head }: WeatherViewModel) {

    return (
        <footer className='c-footer'>
            <div className='o-wrapper'>
                <div className='o-layout'>
                    <div className='o-layout__item u-1/3@tablet o-footer-info'>
                        <h4>{translate(WeatherLocaleNames.info)}</h4>
                        <div>{translate(WeatherLocaleNames.contact)} <a href={'mailto:' + config.email}>{config.email}</a></div>
                        <p>Version: {version}</p>
                        <div>{Share({ url: head.canonical, lang, services: config.shareServices })}</div>
                        {/* <div>{__(LocalesNames.weather_cright)}</div> */}
                    </div>
                    <div className='o-layout__item u-1/3@tablet o-footer-sites'>
                        <h4>{translate(WeatherLocaleNames.international)}</h4>
                        {config.internationalIds.map(code => <div key={code}><a href={getSchema(project, code) + '//' + getHost(project, code) + links.horoscope.home({ ul: lang })}>{getCountryName(code, lang)}</a></div>)}
                    </div>
                    <div className='o-layout__item u-1/3@tablet o-footer-useful'>
                        <h4>{translate(WeatherLocaleNames.useful)}</h4>
                        {config.projects.map(item => <div key={item}><a href={getSchema(item, country) + '//' + getHost(item, country)}>{translate(item)}</a></div>)}
                    </div>
                </div>
            </div>
        </footer>
    )
}
