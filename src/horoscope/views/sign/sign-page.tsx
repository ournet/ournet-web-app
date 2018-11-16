
import * as React from 'react';
import CommonLayout from '../common-layout';
import { SignViewModel } from '../../view-models/sign-view-model';
import { Share } from '../../../views/components/share';
import { PageTitle } from '../../../views/components/page-title';
import { HoroscopeDayReport } from '../components/horoscope-day-report';
import { AdBottom } from '../components/ads/ad-bottom';
import { FacebookScript } from '../../../views/components/facebook-script';
import { HoroscopeSignsLine } from '../../../views/components/horoscope/horoscope-signs-line';

export function SignPage(props: SignViewModel) {

    const { lang, country, head, translate, links, config, title, subTitle, report, currentDayPeriodText } = props;

    return (
        <CommonLayout {...props}>
            <main>
                <div className='u-report-margin'>
                    {Share({ services: config.shareServices, lang, align: 'right', url: head.canonical })}
                    {PageTitle({ title: title || head.title, subTitle: subTitle || head.description })}
                </div>
                {HoroscopeDayReport({ lang, report, date: currentDayPeriodText, footer: true, links, translate })}
                <div className='u-report-margin'>
                {HoroscopeSignsLine({lang, country, links})}
                    <br />
                    {AdBottom()}
                    <br />
                    <div className='fb-comments' data-href={head.canonical} data-numposts="5" data-width="100%" data-order-by="reverse-time"></div>
                    <br />
                    {AdBottom()}
                </div>
            </main>
            {config.oneSignal &&
                <div>
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
}]);

OneSignal.push(function() {

    var category='notifications-horo';
    
    function initNotifications(permission) {
        var currentTags;
        var signId = '${report.sign}';

    function subscribedToCurrentSign() {
        return currentTags && currentTags['zodiac-sign'] == signId;
    }

    function setTags() {
        OneSignal.sendTags({'zodiac-sign': signId});
    }

    function subscribeToNotifications() {
        OneSignal.registerForPushNotifications();
        ga('send', 'event', category, 'show-register-native');
    }

    function hideSubscribe() {
        $('.c-subscribe-bar').addClass('hidden');
    }
    function showSubscribe() {
        $('.c-subscribe-bar').removeClass('hidden');
    }

    if(permission === 'granted') {
        OneSignal.getTags(function(tags) {
        currentTags = tags;
        if (!subscribedToCurrentSign()) {
            showSubscribe();
        }
        });
    } else {
        showSubscribe();
        setTimeout(subscribeToNotifications, 1000*5);
    }
    
    $('.c-subscribe-bar').click(function(event) {
        event.preventDefault();
        event.stopPropagation();
        ga('send', 'event', category, 'click-subscribe-btn');
        if(permission === 'granted') {
            setTags();
            ga('send', 'event', category, 'changed-sign', signId);
            hideSubscribe();
        } else {
            subscribeToNotifications();
        }
    });


    OneSignal.on('notificationPermissionChange', function(permissionChange) {
        var currentPermission = permissionChange.to;
        if (currentPermission === 'granted') {
            setTags();
        }
        ga('send', 'event', category, currentPermission);
    });
    // Occurs when the user's subscription changes to a new value.
    OneSignal.on('subscriptionChange', function (isSubscribed) {
        if (isSubscribed) {
            hideSubscribe();
            setTags();
        } else {
            showSubscribe();
        }
    });

    }

    // If we're on an unsupported browser, do nothing
    if (OneSignal.isPushNotificationsSupported()) {
        OneSignal.push(["getNotificationPermission", function(permission) {
            initNotifications(permission);
        }]);
        //ga('send', 'event', category, 'supported');
    } else {
        hideSubscribe();
        //ga('send', 'event', category, 'not-supported');
    }
});`}}></script>
                </div>}
            {config.facebookId && FacebookScript(config.facebookId, lang, country)}
        </CommonLayout>
    )
}
