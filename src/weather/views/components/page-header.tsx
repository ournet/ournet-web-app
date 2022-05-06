import * as React from "react";
import { Sitemap } from "ournet.links";
import { OurnetLocales } from "../../../locales";
import { resolveProjectLinkPrefix } from "../../../helpers";
import { OurnetProjectName } from "../../../ournet/data";
import { HeaderLogo } from "../../../views/components/header-logo";
import { HeaderSearch } from "./header-search";
import { Place, HourlyForecastDataPoint } from "@ournet/api-client";
import { HeaderPlaceForecast } from "../../../views/components/weather/header-place-forecast";

interface WeatherPageHeaderProps {
  country: string;
  lang: string;
  locales: OurnetLocales;
  capital: Place;
  capitalForecast: HourlyForecastDataPoint;
  links: Sitemap;
}

export function WeatherPageHeader(props: WeatherPageHeaderProps) {
  const { links, lang, country, locales, capital, capitalForecast } = props;
  const project = OurnetProjectName.WEATHER;

  const placeForecast =
    capital && capitalForecast
      ? HeaderPlaceForecast({
          links,
          lang,
          country,
          place: capital,
          forecast: capitalForecast
        })
      : null;

  let logoUrl =
    resolveProjectLinkPrefix(project, OurnetProjectName.PORTAL, country) +
    links.portal.home({ ul: lang });
  let logoTitle = locales.getAppName(project, country);

  if (!links.portal) {
    logoUrl = links.weather.home({ ul: lang });
    logoTitle = locales.getAppName(project, country);
  }

  return (
    <div className="o-wrapper o-wrapper--small">
      <header className="c-header o-layout o-layout--small">
        <div className="o-layout__item u-2/6 u-1/6@tablet">
          {HeaderLogo({ url: logoUrl, title: logoTitle, country })}
        </div>
        <div className="o-layout__item u-4/6 u-3/6@tablet">
          {HeaderSearch(props)}
        </div>
        <div className="o-layout__item u-2/6@tablet u-hide-mobile u-tr">
          {placeForecast}
        </div>
      </header>
    </div>
  );
}
