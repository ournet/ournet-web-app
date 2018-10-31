
import * as React from 'react';
import { PortalBaseHandler } from "./handler";
import { IPortalAppData } from "../data";
import { ErrorViewModelInput, ErrorViewModelBuilder } from '../view-models/error-view-model';
import ErrorPage from '../views/error-page';

export class ErrorHandler extends PortalBaseHandler<ErrorViewModelInput>{
    async handle(data: IPortalAppData) {
        const viewData = await new ErrorViewModelBuilder(this.input, data).build();

        this.setCacheControl(2);

        return this.render(<ErrorPage {...viewData} />);
    }
}
