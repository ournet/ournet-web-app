
import * as React from 'react';
import { NewsBaseHandler } from "./handler";
import { INewsAppData } from "../data";
import { IndexViewModelBuilder } from "../view-models/index-view-model";
import IndexPage from "../views/index/index-page";

export class IndexHandler extends NewsBaseHandler {
    async handle(data: INewsAppData) {
        const viewData = await new IndexViewModelBuilder(this.input, data).build();
        return this.render(this.input.res, <IndexPage {...viewData} />);
    }
}
