import * as React from "react";
import {
  Place,
  HoursForecastDataBlock,
  HoursForecastDataPoint,
  PublicHoliday
} from "@ournet/api-client";
import * as moment from "moment-timezone";
import { WeatherAppConfig } from "../../../config";
import { PlaceDayReport } from "./place-day-report";
import { AdTop } from "../ads/ad-top";
import { AdCenter } from "../ads/ad-center";
import { OurnetLocales } from "../../../../locales";

export type PlaceDailyReportPorps = {
  lang: string;
  locales: OurnetLocales;
  config: WeatherAppConfig;
  place: Place;
  report?: HoursForecastDataBlock;
  holidays: PublicHoliday[];
};

export function PlaceDailyReport({
  place,
  report,
  locales,
  lang,
  config,
  holidays
}: PlaceDailyReportPorps) {
  const daysData: HoursForecastDataPoint[][] = [];

  if (!report || !report.data) {
    return <div className="c-nodata">{locales.forecast_no_data()}</div>;
  }

  const timezone = !!moment.tz.zone(place.timezone)
    ? place.timezone
    : config.timezone;
  let lastDay = -1;

  report.data.forEach((item) => {
    let list = daysData[daysData.length - 1] || [];
    const date = moment(item.time * 1000).tz(timezone);
    if (lastDay !== date.date()) {
      list = [];
      daysData.push(list);
    }
    list.push(item);
    lastDay = date.date();
  });

  const currentUnixTime = moment().tz(timezone).unix();
  const firstDayData = Array.from(daysData[0]);
  const lastDayDateUnixTime = moment(
    firstDayData[firstDayData.length - 1].time * 1000
  )
    .tz(timezone)
    .unix();
  if (currentUnixTime > lastDayDateUnixTime) {
    daysData.shift();
  }

  const items: (JSX.Element | null)[] = [];

  daysData.forEach((dayData, index) => {
    if (index === 1) {
      if (!config.disabledAds) {
        items.push(AdTop());
      }
      if (config.domain === "moti2.al") {
        items.push(
          <div key="moti2-div" id="M454705ScriptRootC701831">
            <div id="M454705PreloadC701831"></div>
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(){
                        var D=new Date(),d=document,b='body',ce='createElement',ac='appendChild',st='style',ds='display',n='none',gi='getElementById',lp=d.location.protocol,wp=lp.indexOf('http')==0?lp:'https:';
                        var i=d[ce]('iframe');i[st][ds]=n;d[gi]("M454705ScriptRootC701831")[ac](i);try{var iw=i.contentWindow.document;iw.open();iw.writeln("<ht"+"ml><bo"+"dy></bo"+"dy></ht"+"ml>");iw.close();var c=iw[b];}
                        catch(e){var iw=d;var c=d[gi]("M454705ScriptRootC701831");}var dv=iw[ce]('div');dv.id="MG_ID";dv[st][ds]=n;dv.innerHTML=701831;c[ac](dv);
                        var s=iw[ce]('script');s.async='async';s.defer='defer';s.charset='utf-8';s.src=wp+"//jsc.mgid.com/m/o/moti2.al.701831.js?t="+D.getUTCFullYear()+D.getUTCMonth()+D.getUTCDate()+D.getUTCHours();c[ac](s);})();`
              }}
            ></script>
          </div>
        );
      }
    } else if (index === 6) {
      // items.push(SubscribeBar({ locales, config, lang, place }));
    } else if (index === 5) {
      if (!config.disabledAds) {
        items.push(AdCenter());
      }
    }
    items.push(
      PlaceDayReport({
        lang,
        locales,
        holidays,
        filter: index === 0,
        config,
        place,
        report: { icon: 0, data: dayData }
      })
    );
  });

  return <div className="c-daily-report">{items}</div>;
}
