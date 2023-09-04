import * as React from "react";
import { NewsBaseHandler } from "./handler";
import { NewsAppData } from "../data";
import BusinessPage from "../views/business/business-page";
import { BusinessViewModelBuilder } from "../view-models/business-view-model";

export class BusinessHandler extends NewsBaseHandler {
  async handle(data: NewsAppData) {
    const viewData = await new BusinessViewModelBuilder(
      this.input,
      data
    ).build();

    this.setCacheControl(10);
    return this.render(<BusinessPage {...viewData} />);
  }
}
