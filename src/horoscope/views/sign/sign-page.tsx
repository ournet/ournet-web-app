import * as React from "react";
import CommonLayout from "../common-layout";
import { SignViewModel } from "../../view-models/sign-view-model";
import { PageTitle } from "../../../views/components/page-title";
import { HoroscopeDayReport } from "../components/horoscope-day-report";
import { AdBottom } from "../components/ads/ad-bottom";
import { HoroscopeSignsLine } from "../../../views/components/horoscope/horoscope-signs-line";
import { Share } from "../../../views/components/share";

export function SignPage(props: SignViewModel) {
  const {
    lang,
    country,
    head,
    locales,
    links,
    config,
    title,
    subTitle,
    report,
    currentDayPeriodText
  } = props;

  return (
    <CommonLayout {...props}>
      <main>
        {PageTitle({
          title: title || head.title,
          subTitle: subTitle || head.description,
          preSubTitle: Share({
            url: head.canonical,
            lang,
            services: config.shareServices,
            align: "right"
          })
        })}
        <br />
        {HoroscopeDayReport({
          lang,
          report,
          date: currentDayPeriodText,
          footer: true,
          links,
          locales
        })}
        {HoroscopeSignsLine({ lang, country, links })}
        {/* {HoroscopeAppAdCard({ lang })} */}
        {AdBottom()}
        <br />
        <br />
        <br />
      </main>
      {config.oneSignal && (
        <div>
          <div
            className="u-hidden js-subscribe-box"
            data-category="notifications-horo"
            data-tags={JSON.stringify({
              "zodiac-sign": report.sign.toString()
            })}
            data-type="force"
          ></div>
          <script
            src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
            async
          ></script>
          <script
            dangerouslySetInnerHTML={{
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
}]);`
            }}
          ></script>
        </div>
      )}
    </CommonLayout>
  );
}
