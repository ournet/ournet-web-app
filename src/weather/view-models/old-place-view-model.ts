
import { PlaceOldIdStringFields, PlaceOldId } from "@ournet/api-client";
import { OurnetViewModelInput } from "../../ournet/view-model";
import { PageViewModel, PageViewModelBuilder } from "../../ournet/page-view-model";
import { WeatherAppConfig } from "../config";
import { WeatherAppData } from "../data";


export interface OldPlaceViewModel extends PageViewModel<WeatherAppConfig> {
    place?: PlaceOldId
}

export interface OldPlaceViewModelInput extends OurnetViewModelInput {
    id: number
}

export class OldPlaceViewModelBuilder extends PageViewModelBuilder<WeatherAppData, WeatherAppConfig, OldPlaceViewModel, OldPlaceViewModelInput> {

    async build() {
        const id = this.input.id;

        this.apiClient.placesPlaceOldId('place', { fields: PlaceOldIdStringFields }, { id });

        return super.build();
    }
}
