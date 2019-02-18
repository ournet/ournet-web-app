import { HoroscopeAppConfig } from "../config";
import { PageViewModel, PageViewModelBuilder } from "../../ournet/page-view-model";
import moment = require("moment");
import { HoroscopeReport, HoroscopeReportStringFields } from "@ournet/api-client";
import { OurnetViewModelInput } from "../../ournet/view-model";
import { HoroscopeAppData } from "../data";
import { HoroscopesHelper, HoroscopeSign } from "@ournet/horoscopes-domain";

export class Widget1ViewModelBuilder extends PageViewModelBuilder<HoroscopeAppData, HoroscopeAppConfig, Widget1ViewModel, OurnetViewModelInput>{

    build() {

        const { lang, links, locales, head } = this.model;

        const model = this.model;
        const currentDate = model.currentDate = moment().tz(model.config.timezone).locale(lang);
        const currentDayPeriod = 'D' + currentDate.format('YYYYMMDD');

        head.title = locales.daily_horoscope();
        head.description = locales.daily_horoscope_details();

        this.setCanonical(links.horoscope.home({ ul: lang }));

        const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            .map(sign => HoroscopesHelper.createReportId(currentDayPeriod, lang, sign as HoroscopeSign));

        this.apiClient.horoscopesReportsByIds('reports', { fields: HoroscopeReportStringFields }, { ids });

        return super.build();
    }

    protected formatModelData(data: Widget1ViewModel) {
        const model = super.formatModelData(data);
        model.reports = (model.reports || []).sort((a, b) => a.sign - b.sign);

        return model;
    }
}

export interface Widget1ViewModel extends PageViewModel<HoroscopeAppConfig> {
    currentDate: moment.Moment
    reports: HoroscopeReport[]
}
