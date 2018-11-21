
import * as React from 'react';
import { NewsBaseHandler } from "./handler";
import { NewsAppData } from "../data";
import { IndexViewModelBuilder } from "../view-models/index-view-model";
import IndexPage from "../views/index/index-page";

export class IndexHandler extends NewsBaseHandler {
    async handle(data: NewsAppData) {
        const viewData = await new IndexViewModelBuilder(this.input, data).build();

        this.setCacheControl(5);
        return this.render(<IndexPage {...viewData} />);
    }
}
