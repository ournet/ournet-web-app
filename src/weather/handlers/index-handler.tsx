import * as React from "react";
import { WeatherBaseHandler } from "./handler";
import { WeatherAppData } from "../data";
import { IndexViewModelBuilder } from "../view-models/index-view-model";
import { IndexPage } from "../views/index/index-page";

export class IndexHandler extends WeatherBaseHandler {
  async handle(data: WeatherAppData) {
    const viewData = await new IndexViewModelBuilder(this.input, data).build();

    this.setCacheControl(10);
    return this.render(<IndexPage {...viewData} />);
  }
}
