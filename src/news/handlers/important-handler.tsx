
import * as React from 'react';
import { NewsBaseHandler } from "./handler";
import { INewsAppData } from "../data";
import { ImportantViewModelBuilder } from '../view-models/important.view-model';
import ImportantPage from '../views/important/important-page';

export class ImportantHandler extends NewsBaseHandler {
    async handle(data: INewsAppData) {
        const viewData = await new ImportantViewModelBuilder(this.input, data).build();
        return this.render(this.input.res, <ImportantPage {...viewData} />);
    }
}