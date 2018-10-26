
import * as React from 'react';
import { NewsViewModel } from '../../view-models/news-view-model';
import { HeaderPlaceForecast } from '../../../views/components/weather/header-place-forecast';
import { NewsLocaleNames } from '../../locale';
import { HeaderLogo } from '../../../views/components/header-logo';

export function PageHeader({ capital, capitalForecast, links, translate, lang, head, country }: NewsViewModel) {

    const placeForecast = capital && capitalForecast
        ? (HeaderPlaceForecast({ links, lang, country, place: capital, forecast: capitalForecast }))
        : null;


    const menuitems = [
        {
            name: translate(NewsLocaleNames.news),
            link: links.news.home({ ul: lang }),
            className: '',
        }, {
            name: translate(NewsLocaleNames.important),
            link: links.news.important({ ul: lang }),
        }, {
            name: translate(NewsLocaleNames.quotes),
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
                {HeaderLogo({ url: links.portal.home({ ul: lang }), title: '' })}
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
