import * as React from "react";
import { PlaceViewModel } from "../../view-models/place-view-model";
import { getPlaceName } from "../../../helpers";
import { PageTitle } from "../../../views/components/page-title";
import { PlaceDailyReport } from "../components/forecast/place-daily-report";
import CommonLayout from "../common-layout";
import {
  BreadcrumbData,
  Breadcrumb
} from "../../../views/components/breadcrumb";
import { Share } from "../../../views/components/share";
import coinWebData from "../../../coin-web-data";

export function PlacePage(props: PlaceViewModel) {
  const {
    locales,
    lang,
    links,
    place,
    placeForecast,
    holidays,
    title,
    subTitle,
    description,
    config,
    head,
    country
  } = props;

  const localeParams = { ul: lang };

  const breadcrumbData: BreadcrumbData = {
    items: [{ text: locales.weather(), url: links.weather.home(localeParams) }]
  };

  const countryName = locales.getCountryName(place.countryCode);

  if (place.countryCode !== country) {
    breadcrumbData.items.push({
      text: countryName,
      url: links.weather.country(place.countryCode.toLowerCase())
    });
  } else if (place.admin1) {
    const adm1Name = getPlaceName(place.admin1, lang);
    breadcrumbData.items.push({
      text: adm1Name,
      url: links.weather.places.byAdm1(place.admin1Code, localeParams)
    });
  }

  const placeName = getPlaceName(place, lang);
  breadcrumbData.items.push({
    text: placeName,
    url: links.weather.place(place.id.toString(), localeParams)
  });

  return (
    <CommonLayout {...props}>
      <main>
        {Breadcrumb(breadcrumbData)}
        {PageTitle({
          title,
          subTitle: `${description}, ${countryName}.`,
          preSubTitle: Share({
            url: head.canonical,
            lang,
            services: config.shareServices,
            align: "right"
          })
        })}
        {PlaceDailyReport({
          holidays,
          report: placeForecast && placeForecast.details,
          place,
          lang,
          config,
          locales,
          country
        })}
        <p className="c-seo-mute">
          {subTitle} {countryName}.
        </p>
      </main>
      <div dangerouslySetInnerHTML={{ __html: coinWebData.buildJS() }}></div>
    </CommonLayout>
  );
}
