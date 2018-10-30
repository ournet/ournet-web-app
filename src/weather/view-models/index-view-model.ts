
import { WeatherViewModelBuilder, WeatherViewModel } from "./weather-view-model";
import { OurnetViewModelInput } from "../../ournet/view-model";
import { WeatherLocaleNames } from "../locale";
import { LocaleHelpers } from "../../ournet/locale";


export class IndexViewModelBuilder extends WeatherViewModelBuilder<IndexViewModel, OurnetViewModelInput> {

    build() {

        const { lang, links, country, translate, head } = this.model;

        const inCountryName = LocaleHelpers.getInCountryName(translate, country);

        head.title = translate(WeatherLocaleNames.home_title_format, { name: inCountryName });
        head.description = translate(WeatherLocaleNames.weather_in_cn_summary, { name: inCountryName });

        this.setCanonical(links.weather.home({ ul: lang }));

        return super.build();
    }

    protected formatModelData(data: IndexViewModel) {
        const model = super.formatModelData(data);
        model.placeIds = (model.mainPlaces || []).map(item => item.id);

        return model;
    }
}

export interface IndexViewModel extends WeatherViewModel {
    placeIds: string[]
}

