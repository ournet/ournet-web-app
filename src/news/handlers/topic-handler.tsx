
import * as React from 'react';
import { NewsBaseHandler } from "./handler";
import { NewsAppData } from "../data";
import { TopicViewModelInput, TopicViewModelBuilder } from '../view-models/topic-view-model';
import TopicPage from '../views/topic/topic-page';

export class TopicHandler extends NewsBaseHandler<TopicViewModelInput>{
    async handle(data: NewsAppData) {
        const viewData = await new TopicViewModelBuilder(this.input, data).build();

        this.setCacheControl(15);
        return this.render(<TopicPage {...viewData} />);
    }
}
