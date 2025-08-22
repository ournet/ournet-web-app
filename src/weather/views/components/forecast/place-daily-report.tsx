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
    } else if (index === 2) {
      if (config.domain === "moti2.al") {
        items.push(
          <div key="moti2-div">
            <div
              data-type="_mgwidget"
              data-widget-id="701831"
              data-src-id="${PUBLISHER_ID}"
            ></div>
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(w,q){w[q]=w[q]||[];w[q].push(["_mgc.load"])})(window,"_mgq");`
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
