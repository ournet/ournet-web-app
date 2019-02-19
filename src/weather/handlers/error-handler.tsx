
import * as React from 'react';
import { WeatherBaseHandler } from "./handler";
import { WeatherAppData } from "../data";
import { ErrorViewModelInput, ErrorViewModelBuilder } from '../view-models/error-view-model';
import ErrorPage from '../views/error-page';

export class ErrorHandler extends WeatherBaseHandler<ErrorViewModelInput>{
    async handle(data: WeatherAppData) {
        const viewData = await new ErrorViewModelBuilder(this.input, data).build();

        this.setCacheControl(2);

        return this.render(<ErrorPage {...viewData} />, this.input.error);
    }
}
