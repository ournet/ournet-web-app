
import * as React from 'react';
import { NewsBaseHandler } from "./handler";
import { INewsAppData } from "../data";
import { EventViewModelInput, EventViewModelBuilder } from '../view-models/event-view-model';
import EventPage from '../views/event/event-page';

export class EventHandler extends NewsBaseHandler<EventViewModelInput>{
    async handle(data: INewsAppData) {
        const viewData = await new EventViewModelBuilder(this.input, data).build();
        return this.render(this.input.res, <EventPage {...viewData} />);
    }
}
