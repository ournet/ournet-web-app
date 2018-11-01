import { HoroscopeViewModel, HoroscopeViewModelBuilder } from "./horoscope-view-model";
import { NewsEvent } from "@ournet/api-client";
import { OurnetViewModelInput } from "../../ournet/view-model";
import logger from "../../logger";

export interface ErrorViewModelInput extends OurnetViewModelInput {
    error: Error
}

export interface ErrorViewModel extends HoroscopeViewModel {
    latestEvents: NewsEvent[]
    error: Error
}

export class ErrorViewModelBuilder extends HoroscopeViewModelBuilder<ErrorViewModel, ErrorViewModelInput> {
    async build() {
        this.model.error = this.input.error;
        
        try {
            return await super.build();
        } catch (e) {
            logger.error(e);
            return this.model;
        }
    }
}
