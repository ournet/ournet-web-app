import * as React from "react";
import { NewsBaseHandler } from "./handler";
import { NewsAppData } from "../data";
import {
  QuoteViewModelBuilder,
  QuoteViewModelInput
} from "../view-models/quote-view-model";
import QuotePage from "../views/quote/quote-page";
import moment = require("moment");

export class QuoteHandler extends NewsBaseHandler<QuoteViewModelInput> {
  async handle(data: NewsAppData) {
    const viewData = await new QuoteViewModelBuilder(this.input, data).build();

    const quote = viewData.quote;

    if (quote.createdAt > moment().add(-12, "h").toISOString()) {
      this.setCacheControl(5);
    } else {
      this.setCacheControl(60);
    }

    return this.render(<QuotePage {...viewData} />);
  }
}
