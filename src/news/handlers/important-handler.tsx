
import * as React from 'react';
import { NewsBaseHandler } from "./handler";
import { INewsAppData } from "../data";
import { OurnetViewModelInput } from '../../ournet/view-model';
import { ImportantViewModelBuilder } from '../view-models/important.view-model';
import ImportantPage from '../views/important/important-page';

export class ImportantHandler<INPUT extends OurnetViewModelInput=OurnetViewModelInput> extends NewsBaseHandler<INPUT>{
    async handle(data: INewsAppData) {
        const viewData = await new ImportantViewModelBuilder(this.input, data).build();
        return this.render(this.input.res, <ImportantPage {...viewData} />);
    }
}
