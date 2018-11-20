
import { WeatherViewModel, WeatherViewModelBuilder } from "./weather-view-model";

export interface WidgetViewModel extends WeatherViewModel {

}

export class WidgetViewModelBuilder extends WeatherViewModelBuilder<WidgetViewModel> {

    build() {
        const model = this.model;

        const { locales, lang, links, country } = model;
        model.head.title = locales.weather_on_your_site();
        model.head.description = locales.weather_on_your_site_info_format(
            { country: locales.getInCountryName(country) });

        this.setCanonical(links.weather.widget({ ul: lang }));

        return super.build();
    }
}
