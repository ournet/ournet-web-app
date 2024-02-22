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
  country: string;
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
  holidays,
  country
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
        if (country === "ro") {
          items.push(
            <iframe
              key="ad-iframe"
              src="https://nobun.ro/assets/ads/page2.html?utm_source=ournet&utm_medium=banner&utm_campaign=weather-top"
              width="100%"
              loading="lazy"
              style={{
                border: "none",
                overflow: "hidden",
                aspectRatio: "6 / 4"
              }}
            ></iframe>
          );
        } else items.push(AdTop());
      }
    } else if (index === 2) {
      if (config.domain === "moti2.al") {
        items.push(
          <div key="moti2-div">
            <div id="M454705ScriptRootC701831"></div>
            <script
              src="https://jsc.mgid.com/m/o/moti2.al.701831.js"
              async
            ></script>
          </div>
        );
      }
    } else if (index === 6) {
      // items.push(SubscribeBar({ locales, config, lang, place }));
    } else if (index === 5) {
      if (!config.disabledAds) {
        if (country === "ro") {
          items.push(
            <iframe
              key="ad-iframe"
              src="https://nobun.ro/assets/ads/page2.html?utm_source=ournet&utm_medium=banner&utm_campaign=weather-center"
              width="100%"
              loading="lazy"
              style={{
                border: "none",
                overflow: "hidden",
                aspectRatio: "6 / 4"
              }}
            ></iframe>
          );
        } else items.push(AdCenter());
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
