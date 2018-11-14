import { WeatherViewModel, WeatherViewModelBuilder } from "./weather-view-model";
import { OurnetViewModelInput } from "../../ournet/view-model";
import logger from "../../logger";

export interface ErrorViewModelInput extends OurnetViewModelInput {
    error: Error
}

export interface ErrorViewModel extends WeatherViewModel {
    error: Error
}

export class ErrorViewModelBuilder extends WeatherViewModelBuilder<ErrorViewModel, ErrorViewModelInput> {
    async build() {
        this.model.error = this.input.error;
        this.model.showGoogleAds = false;

        try {
            return await super.build();
        } catch (e) {
            logger.error(e);
            return this.model;
        }
    }
}
