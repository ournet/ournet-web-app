
import * as React from 'react';
import { NewsBaseHandler } from "./handler";
import { INewsAppData } from "../data";
import { OurnetViewModelInput } from '../../ournet/view-model';
import { QuotesViewModelBuilder } from '../view-models/quotes-model';
import QuotesPage from '../views/quotes/quotes-page';

export class QuotesHandler<INPUT extends OurnetViewModelInput=OurnetViewModelInput> extends NewsBaseHandler<INPUT>{
    async handle(data: INewsAppData) {
        const viewData = await new QuotesViewModelBuilder(this.input, data).build();
        return this.render(this.input.res, <QuotesPage {...viewData} />);
    }
}
