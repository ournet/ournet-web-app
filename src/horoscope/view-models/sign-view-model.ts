
import { HoroscopeViewModel, HoroscopeViewModelBuilder } from "./horoscope-view-model";
import { HoroscopeReport, HoroscopeReportStringFields } from "@ournet/api-client";
import { HoroscopesHelper, HoroscopeSign } from "@ournet/horoscopes-domain";
import { notFound } from "boom";
import { OurnetViewModelInput } from "../../ournet/view-model";
import { HoroscopeLocaleNames } from "../locale";

export interface SignViewModelInput extends OurnetViewModelInput {
    slug: string
}

export interface SignViewModel extends HoroscopeViewModel {
    report: HoroscopeReport
}

export class SignViewModelBuilder extends HoroscopeViewModelBuilder<SignViewModel, SignViewModelInput> {

    build() {

        const { lang, links, translate, head, currentDayPeriodText, currentDayPeriod } = this.model;

        const sign = getSignBySlug(this.input.slug, lang);

        head.title = translate(HoroscopeLocaleNames.sign_daily_title_format, { name: sign.name });
        head.description = translate(HoroscopeLocaleNames.sign_daily_details_format, { name1: sign.name, name2: currentDayPeriodText });

        this.setCanonical(links.horoscope.sign(sign.slug, { ul: lang }));

        const id = HoroscopesHelper.createReportId(currentDayPeriod, lang, sign.id);

        this.apiClient.horoscopesReportById('report', { fields: HoroscopeReportStringFields }, { id });

        return super.build();
    }
}

function getSignBySlug(slug: string, lang: string): { id: HoroscopeSign, name: string, slug: string } {
    for (let i = 1; i <= 12; i++) {
        const sign = HoroscopesHelper.getSignName(i as HoroscopeSign, lang);
        if (sign && sign.slug === slug) {
            return { ...sign, id: (i as HoroscopeSign) };
        }
    }
    throw notFound(`Not found sign ${slug}`);
}
