
import { WeatherViewModel, WeatherViewModelBuilder } from "./weather-view-model";
import { WeatherLocaleNames } from "../locale";
import { LocaleHelpers } from "../../ournet/locale";

export interface WidgetViewModel extends WeatherViewModel {

}

export class WidgetViewModelBuilder extends WeatherViewModelBuilder<WidgetViewModel> {

    build() {
        const model = this.model;

        const { translate, lang, links, country } = model;
        model.head.title = translate(WeatherLocaleNames.weather_on_your_site);
        model.head.description = translate(WeatherLocaleNames.weather_on_your_site_info,
            { name: LocaleHelpers.getInCountryName(translate, country) });

        this.setCanonical(links.weather.widget({ ul: lang }));

        return super.build();
    }
}
