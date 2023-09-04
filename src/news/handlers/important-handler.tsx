import * as React from "react";
import { NewsBaseHandler } from "./handler";
import { NewsAppData } from "../data";
import { ImportantViewModelBuilder } from "../view-models/important-view-model";
import ImportantPage from "../views/important/important-page";

export class ImportantHandler extends NewsBaseHandler {
  async handle(data: NewsAppData) {
    const viewData = await new ImportantViewModelBuilder(
      this.input,
      data
    ).build();

    this.setCacheControl(60);
    return this.render(<ImportantPage {...viewData} />);
  }
}
