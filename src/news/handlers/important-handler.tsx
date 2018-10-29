
import * as React from 'react';
import { NewsBaseHandler } from "./handler";
import { INewsAppData } from "../data";
import { ImportantViewModelBuilder } from '../view-models/important-view-model';
import ImportantPage from '../views/important/important-page';

export class ImportantHandler extends NewsBaseHandler {
    async handle(data: INewsAppData) {
        const viewData = await new ImportantViewModelBuilder(this.input, data).build();
        const res = this.input.res;

        this.setCacheControl(res, 60);
        return this.render(res, <ImportantPage {...viewData} />);
    }
}
