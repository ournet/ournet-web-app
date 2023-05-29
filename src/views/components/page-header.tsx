import * as React from "react";
import { Sitemap } from "ournet.links";
import { OurnetLocales } from "../../locales";
import { Place, HourlyForecastDataPoint } from "@ournet/api-client";
import { HeaderPlaceForecast } from "./weather/header-place-forecast";
import { OurnetProjectName } from "../../ournet/data";
import { HeaderLogo } from "./header-logo";
import { resolveProjectLinkPrefix } from "../../helpers";
import { ProjectsMenu } from "./projects-menu";

interface PageHeaderProps {
  country: string;
  lang: string;
  locales: OurnetLocales;
  links: Sitemap;
  capital: Place;
  capitalForecast: HourlyForecastDataPoint;
  project: OurnetProjectName;
  containsProject: (project: OurnetProjectName) => boolean;
}

export function PageHeader(props: PageHeaderProps) {
  const {
    capital,
    capitalForecast,
    links,
    lang,
    country,
    project,
    locales
  } = props;
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
    logoTitle = locales.getAppName(OurnetProjectName.WEATHER, country);
  }

  return (
    <div className="o-wrapper o-wrapper--small">
      <header className="c-header o-layout o-layout--small">
        <div className="o-layout__item u-2/6 u-1/6@tablet">
          {HeaderLogo({ url: logoUrl, title: logoTitle, country })}
        </div>
        <div className="o-layout__item u-4/6 u-3/6@tablet">
          {ProjectsMenu(props)}
        </div>
        <div className="o-layout__item u-2/6@tablet u-hide-mobile u-tr">
          {placeForecast}
        </div>
      </header>
    </div>
  );
}
