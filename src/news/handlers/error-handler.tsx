import * as React from "react";
import { NewsBaseHandler } from "./handler";
import { NewsAppData } from "../data";
import {
  ErrorViewModelInput,
  ErrorViewModelBuilder
} from "../view-models/error-view-model";
import ErrorPage from "../views/error-page";

export class ErrorHandler extends NewsBaseHandler<ErrorViewModelInput> {
  async handle(data: NewsAppData) {
    const viewData = await new ErrorViewModelBuilder(this.input, data).build();

    this.setCacheControl(2);

    return this.render(<ErrorPage {...viewData} />, this.input.error);
  }
}
