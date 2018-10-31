
import * as React from 'react';
import { PortalBaseHandler } from "./handler";
import { IPortalAppData } from "../data";
import { IndexViewModelBuilder } from "../view-models/index-view-model";
import IndexPage from "../views/index/index-page";

export class IndexHandler extends PortalBaseHandler {
    async handle(data: IPortalAppData) {
        const viewData = await new IndexViewModelBuilder(this.input, data).build();

        this.setCacheControl(5);
        return this.render(<IndexPage {...viewData} />);
    }
}
