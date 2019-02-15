
import * as React from 'react';
import { getSchema, getHost } from 'ournet.links';
import { OurnetProjectName } from '../../ournet/data';
import { OurnetLocales } from '../../locales';
import { OurnetAppConfig } from '../../ournet/config';
import { PageHeadViewData } from '../../ournet/page-view-model';
import { Share } from './share';

interface PageFooterProps {
    project: OurnetProjectName
    locales: OurnetLocales
    lang: string
    config: OurnetAppConfig
    country: string
    version: string
    head: PageHeadViewData
    utilLinks?: { id: string, url: string, text: string, title?: string }[]
    preInfo?: React.ReactNode
}

export function PageFooter({ project, locales, lang, config, country, version, head, utilLinks, preInfo }: PageFooterProps) {

    return (
        <footer className='c-footer'>
            <div className='o-wrapper'>
                <div className='o-layout'>
                    <div className='o-layout__item u-1/3@tablet o-footer-info'>
                        <div>{locales.contact()} <a href={'mailto:' + config.email}>{config.email}</a></div>
                        {preInfo}
                        <p>Version: {version}</p>
                        <div>{Share({ url: head.canonical || '', title: head.title, lang, services: config.shareServices })}</div>
                    </div>
                    <div className='o-layout__item u-1/3@tablet o-footer-useful'>
                        {utilLinks && utilLinks.map(item => <div key={item.id}><a href={item.url} title={item.title}>{item.text}</a></div>)}
                        {config.projects.map(item => <div key={item}><a href={getSchema(item, country) + '//' + getHost(item, country)}>{locales.getProjectName(item)}</a></div>)}
                    </div>
                    <div className='o-layout__item u-1/3@tablet o-footer-sites'>
                        {config.internationalIds.map(code => <div key={code}><a href={getSchema(project, code) + '//' + getHost(project, code)}>{locales.getCountryName(code)}</a></div>)}
                    </div>
                </div>
            </div>
        </footer>
    )
}
