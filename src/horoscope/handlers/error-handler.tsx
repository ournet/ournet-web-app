
import * as React from 'react';
import { HoroscopeBaseHandler } from "./handler";
import { HoroscopeAppData } from "../data";
import { ErrorViewModelInput, ErrorViewModelBuilder } from '../view-models/error-view-model';
import ErrorPage from '../views/error-page';

export class ErrorHandler extends HoroscopeBaseHandler<ErrorViewModelInput>{
    async handle(data: HoroscopeAppData) {
        const viewData = await new ErrorViewModelBuilder(this.input, data).build();

        this.setCacheControl(2);

        return this.render(<ErrorPage {...viewData} />, this.input.error);
    }
}
