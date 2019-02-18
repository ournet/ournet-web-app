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
                        padding: 24px;
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
                        display: block;
                        margin: 0px;
                        padding: 12px;
                        float:left;
                    }
                    .item>a {
                        display: block;
                        height: 100%;
                        width: 100%;
                        opacity: .8;
                    }
                    .item svg {
                        fill: #fff;
                    }
                    .item>a:hover{
                        opacity: 1;
                    }
                    #list.size-12 .item {
                        width: 8.33%;
                        height: 100%;
                    }
                    #list.size-6 .item {
                        width: 16.66%;
                        height: 50%;
                    }
                    #list.size-4 .item, #list.size-3 .item, #list.size-2_6 .item, #list.size-2_8 .item, #list.size-2_4 .item, #list.size-2_2 .item, #list.size-2 .item,#list.size-1_8 .item,#list.size-1_6 .item,#list.size-1_4 .item {
                        width: 25%;
                        height: 33.33%;
                    }
                    #list.size-1 .item,#list.size-1_2 .item, #list.size-0_8 .item, #list.size-0_6 .item {
                        width: 33.33%;
                        height: 25%;
                    }
                    #list.size-0_4 .item, #list.size-0_2 .item {
                        width: 50%;
                        height: 16.66%;
                    }
                    #list.size-0 .item {
                        width: 100%;
                        height: 8.33%;
                    }
                    
                    #by {
                        position: absolute;
                        font-size: 12px;
                        color: #fff;
                        display: inline-block;
                        background: #000;
                        opacity: .5;
                        text-decoration: none;
                        padding: 1px 5px;
                        border-top-left-radius: 3px;
                        border-bottom-right-radius: 3px;
                        bottom: 0px;
                        right: 0px;
                    }
                    #content.small {
                        padding: 12px;
                    }
                    .small .item {
                        padding: 6px;
                    }

                    #content.tiny {
                        padding: 6px;
                    }
                    .tiny .item {
                        padding: 3px;
                    }
                    #icon {
                        position: absolute;
                        width: 18px;
                        height: 18px;
                        display: inline-block;
                        opacity: .7;
                        text-decoration: none;
                        bottom: 2px;
                        right: 2px;
                    }
                    #icon:hover {
                        opacity: 1;
                    }
                    svg {
                        height: 100%;
                        width: 100%;
                        -webkit-filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, .4));
                        filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, .4));
                    }
                    `}}></style>
            </head>
            <body>
                {HoroscopeSvg()}
                <div id='content'>
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
                    <a id='icon' target='_blank' href={getSchema(project, country) + '//' + host}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3937 3937"><g>
                            <path fill="#fff" fillRule="nonzero" d="M668 1298c25-23 27-61 4-86L466 984c-23-25-61-27-86-4l-228 206c-25 23-27 61-4 87l206 228c23 25 62 27 86 4l229-206zM896 679c25 7 51-7 58-32l65-224c7-24-7-51-32-58l-224-65c-25-7-50 7-58 32l-65 224c-7 25 7 50 32 58l224 65zM1204 384c-4 24 12 47 36 51l221 35c24 4 47-12 51-37l36-221c3-24-13-47-37-51l-220-36c-24-4-47 13-51 37l-35 220zM1004 1334c-31 14-67 1-81-30l-127-279c-14-31-1-67 29-81l279-128c31-14 67 0 81 30l127 279c14 30 0 67-30 81l-279 127zM1018 2345c-54 26-118 2-143-51l-232-489c-25-55-3-118 51-144l490-232c54-25 118-2 143 51l232 490c26 54 3 118-51 143l-490 232z"></path>
                            <path fill="#ca0000" fillRule="nonzero" d="M2978 788c-494-269-1069-245-1527 9l339 724c235-154 544-177 808-34 382 208 523 688 315 1069-208 382-688 523-1069 315-187-102-316-269-375-458l-216 101c-16 9-33 16-50 23l-459 214c130 338 376 633 718 819 768 418 1732 133 2150-635s133-1732-635-2149z"></path></g></svg>
                    </a>
                </div>
                <script dangerouslySetInnerHTML={{__html:`
                var timeout=false;
                function setSize() {
                    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                    var step = Math.round(Math.max(w,h)/12);
                    var wSize = Math.round(w/step) || 1;
                    var hSize = Math.round(h/step) || 1;
                    var list = document.getElementById('list');
                    var dif = (wSize / hSize);
                    list.className = 'size-' + dif.toFixed(1).replace(/\.(0|1)$/, '').replace('.','_')
                    .replace(/_3$/, '_2')
                    .replace(/_5$/, '_4')
                    .replace(/_7$/, '_6')
                    .replace(/_9$/, '_8');
                    var min = Math.min(w,h);
                    var contentSize = '';
                    if(min<180) {
                        contentSize = 'tiny';
                    } else if(min<300){
                        contentSize = 'small';
                    }
                    var content = document.getElementById('content');
                    if(dif <= 1.6) {
                        content.className = 'v '+contentSize;
                    } else {
                        content.className = 'h '+contentSize;
                    }
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


