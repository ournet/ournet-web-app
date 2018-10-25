import { OurnetProjectName } from "./app-api";

const roddehI18n = require('roddeh-i18n');

export type Locale = {
    lang: string
    country: string
}

export interface ITranslateFunction {
    (key: string, ...params: any[]): string
}

const LOCALE_CACHE: { [key: string]: ITranslateFunction } = {}

export function createAppLocale(project: OurnetProjectName, lang: string) {
    const key = `${project}-${lang}`;

    if (!LOCALE_CACHE[key]) {
        const data = require(`../../data/locales/${project}/${lang}.json`);
        LOCALE_CACHE[key] = roddehI18n.create(data);
    }

    return LOCALE_CACHE[key];
}
