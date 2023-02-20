import * as React from "react";
import { NewsBaseHandler } from "./handler";
import { NewsAppData } from "../data";
import {
  TopicQuotesViewModelInput,
  TopicQuotesViewModelBuilder
} from "../view-models/topic-quotes-view-model";
import TopicQuotesPage from "../views/topic/topic-quotes-page";

export class TopicQuotesHandler extends NewsBaseHandler<TopicQuotesViewModelInput> {
  async handle(data: NewsAppData) {
    const viewData = await new TopicQuotesViewModelBuilder(
      this.input,
      data
    ).build();

    this.setCacheControl(60 * 6);
    return this.render(<TopicQuotesPage {...viewData} />);
  }
}
