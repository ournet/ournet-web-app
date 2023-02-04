import * as React from "react";
import { NewsBaseHandler } from "./handler";
import { NewsAppData } from "../data";
import {
  SourceViewModelInput,
  SourceViewModelBuilder
} from "../view-models/source-view-model";
import SourcePage from "../views/sources/source-page";

export class SourceHandler extends NewsBaseHandler<SourceViewModelInput> {
  async handle(data: NewsAppData) {
    const viewData = await new SourceViewModelBuilder(this.input, data).build();

    this.setCacheControl(15);
    return this.render(<SourcePage {...viewData} />);
  }
}
