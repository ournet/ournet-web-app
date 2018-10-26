
import * as React from 'react';
import { NewsBaseHandler } from "./handler";
import { INewsAppData } from "../data";
import { IndexViewModelBuilder } from "../view-models/index-view-model";
import IndexPage from "../views/index/index-page";
import { OurnetViewModelInput } from '../../ournet/view-model';

export class IndexHandler<INPUT extends OurnetViewModelInput=OurnetViewModelInput> extends NewsBaseHandler<INPUT>{
    async handle(data: INewsAppData) {
        const viewData = await new IndexViewModelBuilder(this.input, data).build();
        return this.render(this.input.res, <IndexPage {...viewData} />);
    }
}
