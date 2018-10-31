
import * as React from 'react';
import { WeatherBaseHandler } from "./handler";
import { WeatherAppData } from "../data";
import { IndexPage } from '../views/index/index-page';
import { ListViewModelInput, ListViewModelBuilder } from '../view-models/list-view-model';

export class ListHandler extends WeatherBaseHandler<ListViewModelInput> {
    async handle(data: WeatherAppData) {
        const viewData = await new ListViewModelBuilder(this.input, data).build();

        this.setCacheControl(5);
        return this.render(<IndexPage {...viewData} />);
    }
}
