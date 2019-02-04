
import * as React from 'react';
import CommonLayout from '../common-layout';
import { SignViewModel } from '../../view-models/sign-view-model';
import { Share } from '../../../views/components/share';
import { PageTitle } from '../../../views/components/page-title';
import { HoroscopeDayReport } from '../components/horoscope-day-report';
import { AdBottom } from '../components/ads/ad-bottom';
import { FacebookScript } from '../../../views/components/facebook-script';
import { HoroscopeSignsLine } from '../../../views/components/horoscope/horoscope-signs-line';
import { StickyTitle } from '../../../views/components/sticky-title';
import { HoroscopeAppAdCard } from '../components/horoscope-app-ad-card';

export function SignPage(props: SignViewModel) {

    const { lang, country, head, locales, links, config, title, subTitle, report, currentDayPeriodText } = props;

    return (
        <CommonLayout {...props}>
            <main>
                {StickyTitle({ title: title || head.title, url: head.canonical, lang, shareServices: config.shareServices, size: 'large' })}
                <div className='u-report-margin'>
                    {Share({ services: config.shareServices, lang, align: 'right', url: head.canonical })}
                    {PageTitle({ title: title || head.title, subTitle: subTitle || head.description })}
                </div>
                {HoroscopeDayReport({ lang, report, date: currentDayPeriodText, footer: true, links, locales })}
                <div className='u-report-margin'>
                    {HoroscopeSignsLine({ lang, country, links })}
                    {HoroscopeAppAdCard({lang})}
                    {AdBottom()}
                    <br />
                    <div className='fb-comments' data-href={head.canonical} data-numposts="5" data-width="100%" data-order-by="reverse-time"></div>
                    <br />
                    {AdBottom()}
                </div>
            </main>
            {config.oneSignal &&
                <div>
                    <div className='u-hidden js-subscribe-box' data-category='notifications-horo' data-tags={JSON.stringify({ 'zodiac-sign': report.sign.toString() })} data-type='force'></div>
                    <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async></script>
                    <script dangerouslySetInnerHTML={{
                        __html: `var OneSignal = window.OneSignal || [];
OneSignal.push(['init', {
    appId: "${config.oneSignal.appId}",
    autoRegister: false,
    persistNotification: false,
    notifyButton: {
    enable: true,
    showCredit: false,
    prenotify: true
    },
    welcomeNotification: {
    disable: true
    },
    safari_web_id: "${config.oneSignal.safari_web_id}"
}]);`}}></script>
                </div>}
            {config.facebookAppId && FacebookScript(config.facebookAppId, lang, country)}
        </CommonLayout>
    )
}
