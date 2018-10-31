
import { WeatherBaseHandler } from "./handler";
import { WeatherAppData } from "../data";
import { PlaceViewModelInput, PlaceViewModelBuilder } from "../view-models/place-view-model";
import { PlacePage } from "../views/place/place-page";

export class PlaceHandler extends WeatherBaseHandler<PlaceViewModelInput> {
    async handle(data: WeatherAppData) {
        const viewData = await new PlaceViewModelBuilder(this.input, data).build();

        this.setCacheControl(60);
        return this.render(PlacePage(viewData));
    }
}
