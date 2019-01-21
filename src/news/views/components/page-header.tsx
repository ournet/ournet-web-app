
import * as React from 'react';
import { NewsViewModel } from '../../view-models/news-view-model';
import { HeaderPlaceForecast } from '../../../views/components/weather/header-place-forecast';
import { HeaderLogo } from '../../../views/components/header-logo';
import { getSchema, getHost } from 'ournet.links';
import { OurnetProjectName } from '../../../ournet/data';

export function PageHeader({ capital, capitalForecast, links, locales, lang, head, country }: NewsViewModel) {

    const placeForecast = capital && capitalForecast
        ? (HeaderPlaceForecast({ links, lang, country, place: capital, forecast: capitalForecast }))
        : null;


    const menuitems = [
        {
            name: locales.news(),
            link: links.news.home({ ul: lang }),
            className: '',
        }, {
            name: locales.important(),
            link: links.news.important({ ul: lang }),
        }, {
            name: locales.quotes(),
            link: links.news.quotes({ ul: lang }),
        },
    ];

    if (head.canonical) {
        for (let i = 0; i < menuitems.length; i++) {
            if (head.canonical.endsWith(menuitems[i].link)) {
                menuitems[i].className = 'c-menu--selected';
                break;
            }
        }
    }

    return (
        <header className='c-header o-layout o-layout--small'>
            <div className='o-layout__item u-2/6 u-1/6@tablet'>
                {HeaderLogo({ url: getSchema(OurnetProjectName.PORTAL, country) + '//' + getHost(OurnetProjectName.PORTAL, country) + links.portal.home({ ul: lang }), title: '', country })}
            </div>
            <div className='o-layout__item u-4/6 u-3/6@tablet'>
                <ul className='c-menu'>
                    {menuitems.map((item, i) => <li key={i}><a className={item.className} href={item.link}>{item.name}</a></li>)}
                </ul>
            </div>
            <div className='o-layout__item u-2/6@tablet u-hide-mobile u-tr'>
                {placeForecast}
            </div>
        </header>
    )
}
