import { NewsViewModel, NewsViewModelBuilder } from "./news-view-model";
import { NewsEvent } from "@ournet/api-client";
import { OurnetViewModelInput } from "../../ournet/view-model";
import logger from "../../logger";
import { LIST_EVENTS_FIEDLS } from "../config";

export interface ErrorViewModelInput extends OurnetViewModelInput {
    error: Error
}

export interface ErrorViewModel extends NewsViewModel {
    latestEvents: NewsEvent[]
    error: Error
}

export class ErrorViewModelBuilder extends NewsViewModelBuilder<ErrorViewModel, ErrorViewModelInput> {
    async build() {
        this.model.error = this.input.error;
        // this.model.showGoogleAds = false;
        const { lang, country } = this.model;

        this.apiClient.newsEventsLatest('latestEvents', { fields: LIST_EVENTS_FIEDLS }, { params: { lang, country, limit: 4 } });

        try {
            return await super.build();
        } catch (e) {
            logger.error(e);
            return this.model;
        }
    }
}
