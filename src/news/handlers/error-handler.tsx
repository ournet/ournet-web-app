
import * as React from 'react';
import { NewsBaseHandler } from "./handler";
import { INewsAppData } from "../data";
import { ErrorViewModelInput, ErrorViewModelBuilder } from '../view-models/error-view-model';
import ErrorPage from '../views/error-page';

export class ErrorHandler extends NewsBaseHandler<ErrorViewModelInput>{
    async handle(data: INewsAppData) {
        const viewData = await new ErrorViewModelBuilder(this.input, data).build();
        const res = this.input.res;

        this.setCacheControl(res, 2);

        return this.render(res, <ErrorPage {...viewData} />);
    }
}
