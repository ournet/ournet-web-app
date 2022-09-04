import * as React from "react";
import { Sitemap, getSchema, getHost } from "ournet.links";
import { Place, HourlyForecastDataPoint } from "@ournet/api-client";
import { ForecastIcon } from "./forecast-icon";
import { OurnetProjectName } from "../../../ournet/data";
import { ForecastTemp } from "./forecast-temp";
import { getPlaceName } from "../../../helpers";

export interface HeaderPlaceForecastProps {
  country: string;
  lang: string;
  links: Sitemap;
  place: Place;
  forecast: HourlyForecastDataPoint;
}

export function HeaderPlaceForecast({
  links,
  lang,
  country,
  place,
  forecast
}: HeaderPlaceForecastProps) {
  const name = getPlaceName(place, lang);
  return (
    <div className="c-cap">
      {ForecastIcon({ lang, icon: forecast.icon })}
      <span className="c-cap__name">
        <a
          href={
            getSchema(OurnetProjectName.WEATHER, country) +
            "//" +
            getHost(OurnetProjectName.WEATHER, country) +
            links.weather.place(place.id, { ul: lang })
          }
          title={name}
        >
          {name}
        </a>
        {ForecastTemp({ temperature: forecast.temperature })}
      </span>
    </div>
  );
}
