import { WeatherViewModel, WeatherViewModelBuilder } from "./weather-view-model";
import { Place, ForecastReport, PlaceStringFields, ForecastReportStringFields, PublicHoliday, PublicHolidayStringFields } from "@ournet/api-client";
import { notFound } from "boom";
import * as util from 'util';
import { atonic } from "@ournet/domain";
import { OurnetViewModelInput } from "../../ournet/view-model";
import { unixTime, getPlaceName } from "../../helpers";
import { TranslateFunction } from "../../ournet/locale";
import { WeatherLocaleNames } from "../locale";
import { WeatherPlaceHelper } from "../place-helper";


export interface PlaceViewModel extends WeatherViewModel {
    place: Place
    placeForecast: ForecastReport
    holidays: PublicHoliday[]
    description: string
}

export interface PlaceViewModelInput extends OurnetViewModelInput {
    id: string
}

export class PlaceViewModelBuilder extends WeatherViewModelBuilder<PlaceViewModel, PlaceViewModelInput> {

    async build() {
        const id = this.input.id;
        const model = this.model;
        const { country, lang, translate, links } = model;

        const localeApi = this.data.createQueryApiClient<{ place: Place }>();
        const result = await this.executeApiClient(localeApi.placesPlaceById('place', {
            fields: PlaceStringFields,
        }, { id }));

        if (!result || !result.place) {
            throw notFound(`Not found place=${id}`);
        }

        const place = this.model.place = result.place;

        const info = getPageInfo(place, translate, lang);

        model.head.title = info.pageTitle;
        model.head.description = info.description;
        model.title = info.title;
        model.subTitle = info.subTitle;
        model.description = info.description;

        this.setCanonical(links.weather.place(place.id, { ul: lang }));

        this.apiClient.weatherForecastReport('placeForecast', {
            fields: ForecastReportStringFields,
        },
            { place: { longitude: place.longitude, latitude: place.latitude, timezone: place.timezone } });

        const date = new Date();
        date.setUTCHours(0, 0, 0, 0);
        const startTime = unixTime(date);
        date.setUTCDate(date.getUTCDate() + 10);

        this.apiClient.publicHolidays('holidays', { fields: PublicHolidayStringFields },
            { country, lang, start: startTime });

        return super.build();
    }
}

function getPageInfo(place: Place, translate: TranslateFunction, lang: string) {

    const name = getPlaceName(place, lang)
    const inname = WeatherPlaceHelper.inPlaceName(place, lang)
    const adm1 = place.admin1

    let title: string
    let description: string
    let pageTitle: string
    let subTitle: string

    //if is adm1
    if (!adm1) {
        pageTitle = translate(WeatherLocaleNames.weather_item_head_title_format,
            { name1: inname, name2: name });

        description = translate(WeatherLocaleNames.weather_item_head_description_format,
            { name1: inname + util.format(' (%s)', place.name), name2: place.asciiname });

        title = translate(WeatherLocaleNames.weather_title_format, { name: inname });

        subTitle = translate(WeatherLocaleNames.place_weather_details_info,
            { name1: name, name2: place.asciiname, name3: place.name });

    } else {

        const admname = getPlaceName(adm1, lang);
        const shortadmname = WeatherPlaceHelper.shortAdm1Name(adm1, lang);

        let longname = inname;

        if (!WeatherPlaceHelper.isBigCity(place, 10000)) {
            longname = (place.name !== adm1.name && adm1.name.indexOf(place.name) === -1)
                ? util.format('%s, %s', longname, shortadmname)
                : longname;
        }

        pageTitle = translate(WeatherLocaleNames.weather_item_head_title_format,
            { name1: longname, name2: name });

        if (pageTitle.length > 80) {
            pageTitle = translate(WeatherLocaleNames.weather_item_head_title_format,
                { name1: longname, name2: name });
        }

        description = translate(WeatherLocaleNames.weather_item_head_description_format,
            { name1: longname + util.format(' (%s, %s)', place.asciiname, adm1.asciiname), name2: place.name });

        subTitle = translate(WeatherLocaleNames.place_weather_details_info,
            { name1: longname, name2: util.format('%s, %s', place.asciiname, admname), name3: name });

        title = translate(WeatherLocaleNames.weather_title_format, { name: longname });
    }

    if (lang === 'ro') {
        pageTitle = atonic(pageTitle);
    }

    return {
        pageTitle,
        title,
        description,
        subTitle
    }
} 
