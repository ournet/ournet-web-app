import * as React from "react";
import { NewsBaseHandler } from "./handler";
import { NewsAppData } from "../data";
import {
  EventViewModelInput,
  EventViewModelBuilder
} from "../view-models/event-view-model";
import EventPage from "../views/event/event-page";

export class EventHandler extends NewsBaseHandler<EventViewModelInput> {
  async handle(data: NewsAppData) {
    const viewData = await new EventViewModelBuilder(this.input, data).build();

    this.setCacheControl(5);

    return this.render(<EventPage {...viewData} />);
  }
}
