
import { WeatherBaseHandler } from "./handler";
import { WeatherAppData } from "../data";
import { PlacesViewModelInput, PlacesViewModelBuilder } from "../view-models/places-view-model";
import { PlacesPage } from "../views/places/places-page";

export class PlacesHandler extends WeatherBaseHandler<PlacesViewModelInput> {
    async handle(data: WeatherAppData) {
        const viewData = await new PlacesViewModelBuilder(this.input, data).build();

        this.setCacheControl(60 * 24);
        return this.render(PlacesPage(viewData));
    }
}
