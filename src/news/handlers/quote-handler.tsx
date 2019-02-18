
import * as React from 'react';
import { NewsBaseHandler } from "./handler";
import { NewsAppData } from "../data";
import { QuoteViewModelBuilder, QuoteViewModelInput } from '../view-models/quote-view-model';
import QuotePage from '../views/quote/quote-page';

export class QuoteHandler extends NewsBaseHandler<QuoteViewModelInput>{
    async handle(data: NewsAppData) {
        const viewData = await new QuoteViewModelBuilder(this.input, data).build();

        this.setCacheControl(15);
        return this.render(<QuotePage {...viewData} />);
    }
}
