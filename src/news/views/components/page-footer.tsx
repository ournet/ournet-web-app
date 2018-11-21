
import * as React from 'react';
import { NewsViewModel } from '../../view-models/news-view-model';
import { getSchema, getHost } from 'ournet.links';
import { Share } from '../../../views/components/share';

export function PageFooter({ project, locales, lang, config, country, version, head }: NewsViewModel) {

    return (
        <footer className='c-footer'>
            <div className='o-wrapper'>
                <div className='o-layout'>
                    <div className='o-layout__item u-1/3@tablet o-footer-info'>
                        <h4>{locales.info()}</h4>
                        <div>{locales.contact()} <a href={'mailto:' + config.email}>{config.email}</a></div>
                        <p>Version: {version}</p>
                        <div>{Share({ url: head.canonical, lang, services: config.shareServices })}</div>
                        {/* <div>{__(LocalesNames.weather_cright)}</div> */}
                    </div>
                    <div className='o-layout__item u-1/3@tablet o-footer-sites'>
                        <h4>{locales.international()}</h4>
                        {config.internationalIds.map(code => <div key={code}><a href={getSchema(project, code) + '//' + getHost(project, code)}>{locales.getCountryName(code)}</a></div>)}
                    </div>
                    <div className='o-layout__item u-1/3@tablet o-footer-useful'>
                        <h4>{locales.useful()}</h4>
                        {config.projects.map(item => <div key={item}><a href={getSchema(item, country) + '//' + getHost(item, country)}>{locales.getProjectName(item)}</a></div>)}
                    </div>
                </div>
            </div>
        </footer>
    )
}
