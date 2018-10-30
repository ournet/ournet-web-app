
import * as React from 'react';
import { WeatherBaseHandler } from "./handler";
import { WeatherAppData } from "../data";
import { ErrorViewModelInput, ErrorViewModelBuilder } from '../view-models/error-view-model';
import ErrorPage from '../views/error-page';

export class ErrorHandler extends WeatherBaseHandler<ErrorViewModelInput>{
    async handle(data: WeatherAppData) {
        const viewData = await new ErrorViewModelBuilder(this.input, data).build();
        const res = this.input.res;

        this.setCacheControl(res, 2);

        return this.render(res, <ErrorPage {...viewData} />);
    }
}
