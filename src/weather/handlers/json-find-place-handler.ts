
import { WeatherBaseHandler } from "./handler";
import { WeatherAppData } from "../data";
import { OurnetViewModelInput, getLanguageFromQueryString } from "../../ournet/view-model";
import { Place, PlaceStringFields } from "@ournet/api-client";
import { createAppConfig } from "../../ournet/config";
import { atonic } from "@ournet/domain";
import { getPlaceName } from "../../helpers";

export interface JsonFindPlaceViewModelInput extends OurnetViewModelInput {
    q: string
}

export class JsonFindPlaceHandler extends WeatherBaseHandler<JsonFindPlaceViewModelInput> {
    async handle(data: WeatherAppData) {
        let q = this.input.q;

        this.setCacheControl(60 * 27 * 7);

        if (!q || q.trim().length < 3) {
            return this.send([], 200);
        }

        const api = data.createQueryApiClient<{ places: Place[] }>();

        const country = this.input.country;
        const lang = getLanguageFromQueryString(createAppConfig(this.input.project, country), this.input.url.query);

        if (['ro'].includes(lang)) {
            q = atonic(q);
        }

        api.placesSearchPlace('places', { fields: PlaceStringFields }, { query: q.trim(), country, limit: 10, type: 'phrase_prefix' });

        const result = await api.queryExecute();

        if (!result || !result.data) {
            return this.send([], 200);
        }

        const places = (result.data.places || []).filter(item => item.featureClass !== 'A');

        const json = places.map(place => ({ id: place.id, name: getPlaceName(place, lang), admin: place.admin1 && getPlaceName(place.admin1, lang) }));

        this.send(json, 200);
    }
}
