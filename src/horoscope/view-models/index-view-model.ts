
import { HoroscopeViewModelBuilder, HoroscopeViewModel } from "./horoscope-view-model";
import { HoroscopeReport, HoroscopeReportStringFields } from "@ournet/api-client";
import { OurnetViewModelInput } from "../../ournet/view-model";
import { HoroscopesHelper, HoroscopeSign } from "@ournet/horoscopes-domain";


export class IndexViewModelBuilder<T extends IndexViewModel, I extends OurnetViewModelInput>
    extends HoroscopeViewModelBuilder<T, I> {

    build() {

        const { lang, links, locales, head, currentDayPeriodText, currentDayPeriod } = this.model;

        head.title = locales.daily_horoscope();
        head.description = locales.daily_horoscope_details();

        this.setCanonical(links.horoscope.home({ ul: lang }));

        this.model.title = locales.daily_horoscope_format( { name: currentDayPeriodText });
        this.model.subTitle = locales.daily_horoscope_details_format( { name: currentDayPeriodText });

        const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            .map(sign => HoroscopesHelper.createReportId(currentDayPeriod, lang, sign as HoroscopeSign));

        this.apiClient.horoscopesReportsByIds('reports', { fields: HoroscopeReportStringFields }, { ids });

        return super.build();
    }
}

export interface IndexViewModel extends HoroscopeViewModel {
    reports: HoroscopeReport[]
}

