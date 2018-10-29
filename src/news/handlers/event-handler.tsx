
import * as React from 'react';
import { NewsBaseHandler } from "./handler";
import { INewsAppData } from "../data";
import { EventViewModelInput, EventViewModelBuilder } from '../view-models/event-view-model';
import EventPage from '../views/event/event-page';

export class EventHandler extends NewsBaseHandler<EventViewModelInput>{
    async handle(data: INewsAppData) {
        const viewData = await new EventViewModelBuilder(this.input, data).build();
        const res = this.input.res;

        this.setCacheControl(res, 5);

        return this.render(res, <EventPage {...viewData} />);
    }
}
