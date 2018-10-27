import { OurnetProjectName } from "./data";

const roddehI18n = require('roddeh-i18n');

export type Locale = {
    lang: string
    country: string
}

export interface TranslateFunction {
    (key: string, ...params: any[]): string
}

const LOCALE_CACHE: { [key: string]: TranslateFunction } = {}

export function createAppLocale(project: OurnetProjectName, lang: string) {
    const key = `${project}-${lang}`;

    if (!LOCALE_CACHE[key]) {
        const data = require(`../../locales/${project}/${lang}.json`);
        LOCALE_CACHE[key] = roddehI18n.create(data);
    }

    return LOCALE_CACHE[key];
}

export class LocaleHelpers {
    static getCountryName(translate: TranslateFunction, countryCode: string) {
        return translate(`country_${countryCode}`);
    }

    static getInCountryName(translate: TranslateFunction, countryCode: string) {
        return translate(`in_country_${countryCode}`);
    }

    static getLanguageName(translate: TranslateFunction, languageCode: string) {
        return translate(`language_${languageCode}`);
    }

    static getProjectName(translate: TranslateFunction, project: string) {
        return translate(project);
    }
}
