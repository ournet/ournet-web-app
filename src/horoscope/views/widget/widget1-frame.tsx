import * as React from 'react';
import { getHost, getSchema } from 'ournet.links';
import { Widget1ViewModel } from '../../view-models/widget1-view-model';
import { HoroscopesHelper, HoroscopeSign } from '@ournet/horoscopes-domain';
import { HoroscopeSvg } from '../../../views/components/horoscope/horoscope-svg';

export function Widget1Frame(props: Widget1ViewModel) {


    const { lang, project, country, reports, links } = props;

    const host = getHost(project, country);

    return (
        <html lang={lang}>
            <head>
                <meta charSet="utf-8" />
                <title>Widget1</title>
                <style type="text/css" dangerouslySetInnerHTML={{
                    __html: `
                    *, :after, :before {
                        box-sizing: inherit;
                    }
                    html {
                        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
                        color: #333;
                        line-height: 1.5;
                        font-size: 16px;
                        font-size: 1em;
                        margin:0;padding:0;
                        height: 100%;
                        box-sizing: border-box;
                        background: transparent;
                        -ms-text-size-adjust: 100%;
                        -webkit-text-size-adjust: 100%;
                    }
                    body{
                        margin:0;padding:0;
                        height: 100%;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                    }
                    #content {
                        height: 100%;
                        position: relative;
                        user-select: none;
                        overflow: hidden;
                        border-radius: 4px;
                        background-color: #333;
                        padding: 12px 24px;
                        text-align: center;
                        background-position: center;
                        background-size: cover;
                    }
                    #content.v {
                        background-image: url('//assets.ournetcdn.net/ournet/img/horo/night-sky-480.jpg');
                    }
                    #content.h {
                        background-image: url('//assets.ournetcdn.net/ournet/img/horo/night-sky-480-160.jpg');
                    }
                    #list {
                        display: block;
                        margin: 0px;
                        padding: 0px;
                        list-style: none;
                        overflow: hidden;
                        height: 100%;
                    }
                    .item {
                        display: inline-block;
                        margin: 0px;
                        padding: 6px;
                    }
                    .item>a {
                        display: block;
                        height: 100%;
                        width: 100%;
                        opacity: .8;
                    }
                    .item svg {
                        height: 100%;
                        width: 100%;
                        fill: #fff;
                    }
                    .item>a:hover{
                        opacity: 1;
                    }
                    .v .item {
                        width: 33.33%;
                        height: 25%;
                    }
                    .h .item {
                        width: 25%;
                        height: 33.33%;
                    }
                    #by {
                        position: absolute;
                        font-size: 12px;
                        color: #eee;
                        display: inline-block;
                        background: #000;
                        opacity: .8;
                        text-decoration: none;
                        padding: 1px 5px;
                        border-top-left-radius: 3px;
                        border-bottom-right-radius: 3px;
                        bottom: 0px;
                        right: 0px;
                    }
                    `}}></style>
            </head>
            <body>
                {HoroscopeSvg()}
                <div id='content' className='v'>
                    <ul id='list'>
                        {reports.map(item => {
                            const sign = HoroscopesHelper.getSignName(item.sign as HoroscopeSign, lang);
                            if (!sign) return null;
                            return (
                                <li key={item.sign} className='item'>
                                    <a target='_blank' title={sign.name} href={links.horoscope.sign(sign.slug, { ul: lang })}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><use href={"#svg-zs-icon-" + item.sign}></use></svg>
                                    </a>
                                </li>)
                        })}
                    </ul>
                    <a id='by' target='_blank' href={getSchema(project, country) + '//' + host}>{host}</a>
                </div>
                <script dangerouslySetInnerHTML={{__html:`
                var timeout=false;
                function setSize() {
                    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                    var content = document.getElementById('content');
                    if (Math.min(w,h)<350) {
                        content.classList.add('small');
                    }
                    var addClass = w > h ? 'h' : 'v';
                    var removeClass = addClass === 'v' ? 'h' : 'v';
                    content.classList.remove(removeClass);
                    content.classList.add(addClass);
                }
                // window.resize event listener
                window.addEventListener('resize', function() {
                    clearTimeout(timeout);
                    timeout = setTimeout(setSize, 250);
                });
                document.addEventListener("DOMContentLoaded", function() {
                    setSize();
                });
                `}}>
                </script>
            </body>
        </html >
    )
}


