import * as React from "react";
import CommonLayout from "../common-layout";
import { SignViewModel } from "../../view-models/sign-view-model";
import { PageTitle } from "../../../views/components/page-title";
import { HoroscopeDayReport } from "../components/horoscope-day-report";
import { AdBottom } from "../components/ads/ad-bottom";
import { Share } from "../../../views/components/share";

export function SignPage(props: SignViewModel) {
  const {
    lang,
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
        {/* {HoroscopeSignsLine({ lang, country, links })} */}
        {/* {HoroscopeAppAdCard({ lang })} */}
        {AdBottom()}
        <br />
        <br />
        <br />
      </main>
    </CommonLayout>
  );
}
