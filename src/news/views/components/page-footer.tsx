
import * as React from 'react';
import { NewsViewModel } from '../../view-models/news-view-model';
import { NewsLocaleNames } from '../../locale';
import { getSchema, getHost } from 'ournet.links';
import { getCountryName } from '../../../helpers';

export function PageFooter({ project, links, translate, lang, config, country, version }: NewsViewModel) {

    return (
        <footer className='c-footer'>
            <div className='o-wrapper'>
                <div className='o-layout'>
                    <div className='o-layout__item u-1/3@tablet o-footer-info'>
                        <h4>{translate(NewsLocaleNames.info)}</h4>
                        <div>{translate(NewsLocaleNames.contact)} <a href={'mailto:' + config.email}>{config.email}</a></div>
                        <div>Version: {version}</div>
                        {/* <div>{__(LocalesNames.weather_cright)}</div> */}
                    </div>
                    <div className='o-layout__item u-1/3@tablet o-footer-sites'>
                        <h4>{translate(NewsLocaleNames.international)}</h4>
                        {config.internationalIds.map(code => <div key={code}><a href={getSchema(project, code) + '//' + getHost(project, code) + links.horoscope.home({ ul: lang })}>{getCountryName(code, lang)}</a></div>)}
                    </div>
                    <div className='o-layout__item u-1/3@tablet o-footer-useful'>
                        <h4>{translate(NewsLocaleNames.useful)}</h4>
                        {config.projects.map(item => <div key={item}><a href={getSchema(item, country) + '//' + getHost(item, country)}>{translate(item)}</a></div>)}
                    </div>
                </div>
            </div>
        </footer>
    )
}