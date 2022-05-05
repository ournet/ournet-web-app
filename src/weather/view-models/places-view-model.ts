import {
  WeatherViewModel,
  WeatherViewModelBuilder
} from "./weather-view-model";
import { Place } from "@ournet/api-client";
import { OurnetViewModelInput } from "../../ournet/view-model";

export interface PlacesViewModel extends WeatherViewModel {
  places: Place[];
  placesAdmin1?: Place;
  ref?: string;
}

export interface PlacesViewModelInput extends OurnetViewModelInput {
  admin1Code?: string;
  countryCode?: string;
  q?: string;
}

export class PlacesViewModelBuilder extends WeatherViewModelBuilder<
  PlacesViewModel,
  PlacesViewModelInput
> {
  async build() {
    const { country, links, lang } = this.model;
    const { q, admin1Code } = this.input;

    if (admin1Code) {
      this.apiClient.placesPlacesByAdmin1Code(
        "places",
        { fields: "id name names admin1Code featureClass" },
        { country, admin1Code, limit: 90 }
      );
      this.apiClient.placesAdmin1(
        "placesAdmin1",
        { fields: "id name names admin1Code featureClass" },
        { country, admin1Code }
      );

      this.setCanonical(links.weather.places.byAdm1(admin1Code, { ul: lang }));
    } else {
      if (q && q.trim().length > 1) {
        this.apiClient.placesSearchPlace(
          "places",
          {
            fields:
              "id name names admin1Code featureClass population admin1 {id name names}"
          },
          { query: q, limit: 24, country }
        );
        this.setCanonical(links.weather.places({ q, ul: lang }));
        this.model.ref = "search";
      } else {
        this.apiClient.placesAdmin1s(
          "places",
          { fields: "id name names admin1Code featureClass" },
          { country, limit: 90 }
        );
        this.setCanonical(links.weather.places({ ul: lang }));
      }
    }

    return super.build();
  }

  protected formatModelData(data: PlacesViewModel) {
    const model = super.formatModelData(data);
    if (this.input.q) {
      model.places = (model.places || []).sort(
        (a, b) => (b.population || 0) - (a.population || 0)
      );
      model.places = model.places.filter((item) => item.featureClass !== "A");
    }

    return model;
  }
}
