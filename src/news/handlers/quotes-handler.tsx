
import * as React from 'react';
import { NewsBaseHandler } from "./handler";
import { INewsAppData } from "../data";
import { QuotesViewModelBuilder } from '../view-models/quotes-view-model';
import QuotesPage from '../views/quotes/quotes-page';

export class QuotesHandler extends NewsBaseHandler {
    async handle(data: INewsAppData) {
        const viewData = await new QuotesViewModelBuilder(this.input, data).build();
        const res = this.input.res;

        this.setCacheControl(res, 10);
        return this.render(res, <QuotesPage {...viewData} />);
    }
}
