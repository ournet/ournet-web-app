import { WeatherBaseHandler } from "./handler";
import { WeatherAppData } from "../data";
import { OldPlaceViewModelInput, OldPlaceViewModelBuilder } from "../view-models/old-place-view-model";
import { Dictionary } from "@ournet/domain";

export class WidgetOldPlaceHandler extends WeatherBaseHandler<OldPlaceViewModelInput> {
    async handle(data: WeatherAppData) {
        const viewData = await new OldPlaceViewModelBuilder(this.input, data).build();
        const { links, lang, place } = viewData;

        this.setCacheControl(60 * 24);

        if (!place) {
            return this.redirect(links.weather.home({ ul: lang }), 301);
        }

        const q = { ...this.input.url.query } as Dictionary<string>;
        q.id = place.geonameid.toString();

        return this.redirect(links.weather.widget.widgetFrame(q), 301);
    }
}
