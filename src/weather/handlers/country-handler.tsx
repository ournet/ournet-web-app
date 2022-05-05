import * as React from "react";
import { WeatherBaseHandler } from "./handler";
import { WeatherAppData } from "../data";
import {
  CountryViewModelBuilder,
  CountryViewModelInput
} from "../view-models/country-view-model";
import { IndexPage } from "../views/index/index-page";

export class CountryHandler extends WeatherBaseHandler<CountryViewModelInput> {
  async handle(data: WeatherAppData) {
    const viewData = await new CountryViewModelBuilder(
      this.input,
      data
    ).build();

    this.setCacheControl(60);

    return this.render(<IndexPage {...viewData} />);
  }
}
