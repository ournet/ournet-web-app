
import { WeatherViewModelBuilder, WeatherViewModel } from "./weather-view-model";
import { OurnetViewModelInput } from "../../ournet/view-model";


export class IndexViewModelBuilder extends WeatherViewModelBuilder<IndexViewModel, OurnetViewModelInput> {

    build() {

        const { lang, links, country, locales, head } = this.model;

        const inCountryName = locales.getInCountryName(country);

        head.title = locales.weather_home_title_format({ name: inCountryName });
        head.description = locales.weather_in_cn_summary_format({ country: inCountryName });

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

