
import * as React from 'react';
import { NewsBaseHandler } from "./handler";
import { INewsAppData } from "../data";
import { IndexViewModelBuilder } from "../view-models/index-view-model";
import IndexPage from "../views/index/index-page";

export class IndexHandler extends NewsBaseHandler {
    async handle(data: INewsAppData) {
        const viewData = await new IndexViewModelBuilder(this.input, data).build();
        const res = this.input.res;

        this.setCacheControl(res, 5);
        return this.render(res, <IndexPage {...viewData} />);
    }
}
