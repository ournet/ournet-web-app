
import * as React from 'react';
import { getSchema, getHost } from 'ournet.links';
import { Share } from '../../../views/components/share';
import { WeatherViewModel } from '../../view-models/weather-view-model';

export function PageFooter({ project, links, locales, lang, config, country, version, head }: WeatherViewModel) {

    return (
        <footer className='c-footer'>
            <div className='o-wrapper'>
                <div className='o-layout'>
                    <div className='o-layout__item u-1/3@tablet o-footer-info'>
                        <h4>{locales.info()}</h4>
                        <div>{locales.contact()} <a href={'mailto:' + config.email}>{config.email}</a></div>
                        <div>{locales.weather_cright()}</div>
                        <p>Version: {version}</p>
                        <div>{Share({ url: head.canonical, lang, services: config.shareServices })}</div>
                        {/* <div>{__(LocalesNames.weather_cright)}</div> */}
                    </div>
                    <div className='o-layout__item u-1/3@tablet o-footer-sites'>
                        <h4>{locales.international()}</h4>
                        {config.internationalIds.map(code => <div key={code}><a href={getSchema(project, code) + '//' + getHost(project, code) + links.horoscope.home({ ul: lang })}>{locales.getCountryName(code)}</a></div>)}
                    </div>
                    <div className='o-layout__item u-1/3@tablet o-footer-useful'>
                        <h4>{locales.useful()}</h4>
                        <div><a href={links.weather.widget({ ul: lang })}>{locales.weather_on_your_site()}</a></div>
                        {config.projects.map(item => <div key={item}><a href={getSchema(item, country) + '//' + getHost(item, country)}>{locales.getProjectName(item)}</a></div>)}
                    </div>
                </div>
            </div>
        </footer>
    )
}
