import * as React from "react";
import { IndexViewModel } from "../../view-models/index-view-model";
import CommonLayout from "../common-layout";
import { PageTitle } from "../../../views/components/page-title";
import { ForecastBrowser } from "../components/forecast/forecast-browser";
import { Share } from "../../../views/components/share";
import { ALL_WEATHER_COUNTRY_CODES } from "../../data";
import { GroupHeader } from "../../../views/components/group-header";

export class IndexPage extends React.Component<IndexViewModel> {
  render() {
    const {
      head,
      placeIds,
      currentDate,
      locales,
      lang,
      config,
      links,
      country
    } = this.props;

    head.elements.push(
      <link
        key="index-rss"
        rel="alternate"
        type="application/rss+xml"
        href={links.weather.sitemap.regionIndex({ ul: lang })}
      ></link>
    );
    ALL_WEATHER_COUNTRY_CODES.forEach((code) => {
      head.elements.push(
        <link
          key={`main-places-${code}-rss`}
          rel="alternate"
          title={`${code} main places`}
          type="application/rss+xml"
          href={links.weather.sitemap.mainPlaces(code, { ul: lang })}
        ></link>
      );
    });

    const countries = ALL_WEATHER_COUNTRY_CODES.filter((it) => it !== country)
      .map((code) => ({
        name: locales.getCountryName(code),
        code
      }))
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((it) => (
        <div
          key={it.code}
          className="c-places-list__i o-layout__item u-1/2 u-1/3@tablet"
        >
          <a href={links.weather.country(it.code, { ul: lang })}>{it.name}</a>
        </div>
      ));

    return (
      <CommonLayout {...this.props}>
        <main>
          {PageTitle({
            title: head.title,
            subTitle: head.description,
            preSubTitle: Share({
              url: head.canonical,
              lang,
              services: config.shareServices,
              align: "right"
            })
          })}
          {ForecastBrowser({
            places: placeIds,
            today: currentDate,
            days: 5,
            locales
          })}
          <div className="c-group">
            {GroupHeader({ name: locales.weather_around_the_world() })}
            <div className="o-layout o-layout--small c-places-list">
              {countries}
            </div>
          </div>
        </main>
      </CommonLayout>
    );
  }
}
