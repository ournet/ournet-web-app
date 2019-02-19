
import { HoroscopeViewModel, HoroscopeViewModelBuilder } from "./horoscope-view-model";

export interface WidgetsViewModel extends HoroscopeViewModel {

}

export class WidgetsViewModelBuilder extends HoroscopeViewModelBuilder<WidgetsViewModel> {
    build() {

        const { lang, links, locales, head } = this.model;

        head.title = locales.horo_on_your_site();
        head.description = locales.horo_on_your_site_info();

        this.setCanonical(links.horoscope.widgets({ ul: lang }));

        return super.build();
    }
}

