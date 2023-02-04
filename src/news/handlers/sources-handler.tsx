import * as React from "react";
import { NewsBaseHandler } from "./handler";
import { NewsAppData } from "../data";
import { SourcesViewModelBuilder } from "../view-models/sources-view-model";
import SourcesPage from "../views/sources/sources-page";

export class SourcesHandler extends NewsBaseHandler {
  async handle(data: NewsAppData) {
    const viewData = await new SourcesViewModelBuilder(
      this.input,
      data
    ).build();

    this.setCacheControl(60);
    return this.render(<SourcesPage {...viewData} />);
  }
}
