
import { LocalesProvider, GeneratedLocales, LocalesKey } from './generated-locales';
import { TranslatorOptions, Locales, parseDirectory } from 'localizy';
import { join } from 'path';
import { OurnetProjectName } from './ournet/data';

export type Locale = {
    lang: string
    country: string
}

export class OurnetTranslator extends LocalesProvider<OurnetLocales> {
    constructor(options: TranslatorOptions) {
        super(options, (t: Locales) => new OurnetLocales(t))
    }
}

export const OURNET_TRANSLATOR = new OurnetTranslator({
    data: parseDirectory({ directory: join(__dirname, '..', 'locales') }),
    throwUndefinedKey: true,
})

export class OurnetLocales extends GeneratedLocales {
    getCountryName(countryCode: string) {
        return this.s(`country_${countryCode}` as LocalesKey);
    }

    getInCountryName(countryCode: string) {
        return this.s(`in_country_${countryCode}` as LocalesKey);
    }

    getLanguageName(languageCode: string) {
        return this.s(`language_${languageCode}` as LocalesKey);
    }

    getProjectName(project: OurnetProjectName) {
        return this.s(project as LocalesKey);
    }

    getAppName(project: OurnetProjectName, country: string) {
        return this.s(`${project}_${country}_app_name` as LocalesKey);
    }

    getShortAppName(project: OurnetProjectName, country: string) {
        return this.s(`${project}_${country}_short_app_name` as LocalesKey);
    }
}
