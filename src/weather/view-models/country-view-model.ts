import {
  WeatherViewModel,
  WeatherViewModelBuilder
} from "./weather-view-model";
import { Place } from "@ournet/api-client";
import { OurnetViewModelInput } from "../../ournet/view-model";

export interface CountryViewModel extends WeatherViewModel {
  places: Place[];
  placeIds: string[];
}

export interface CountryViewModelInput extends OurnetViewModelInput {
  countryCode: string;
}

export class CountryViewModelBuilder extends WeatherViewModelBuilder<
  CountryViewModel,
  CountryViewModelInput
> {
  async build() {
    const { lang, links, locales, head } = this.model;
    const { countryCode: country } = this.input;
    const countryName = locales.getCountryName(country);

    head.title = `${countryName}: ${locales.weather}`;
    head.description = locales.weather_in_cn_summary_format({
      country: countryName
    });

    this.apiClient.placesMainPlaces(
      "places",
      { fields: "id" },
      { country, limit: 20 }
    );

    this.setCanonical(links.weather.country(country, { ul: lang }));

    return super.build();
  }

  protected formatModelData(data: CountryViewModel) {
    const model = super.formatModelData(data);
    model.placeIds = (model.places || []).map((item) => item.id);

    return model;
  }
}
