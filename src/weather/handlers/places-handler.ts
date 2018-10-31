
import { WeatherBaseHandler } from "./handler";
import { WeatherAppData } from "../data";
import { PlacesViewModelInput, PlacesViewModelBuilder } from "../view-models/places-view-model";
import { PlacesPage } from "../views/places/places-page";

export class PlacesHandler extends WeatherBaseHandler<PlacesViewModelInput> {
    async handle(data: WeatherAppData) {
        const viewData = await new PlacesViewModelBuilder(this.input, data).build();
        const res = this.input.res;

        this.setCacheControl(res, 60 * 24);
        return this.render(res, PlacesPage(viewData));
    }
}
