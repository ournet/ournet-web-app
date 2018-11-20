
import { GeneratedTranslator, TranslatorKey, TranslatorProvider } from './generated-locale';
import { ProviderOptions, Translator } from 'lang-text';

export type Locale = {
    lang: string
    country: string
}

export class OurnetTranslatorProvider extends TranslatorProvider<OurnetTranslator> {
    constructor(options: ProviderOptions) {
        super(options, (t: Translator) => new OurnetTranslator(t))
    }
}

export class OurnetTranslator extends GeneratedTranslator {
    getCountryName(countryCode: string) {
        return this.s(`country_${countryCode}` as TranslatorKey);
    }

    getInCountryName(countryCode: string) {
        return this.s(`in_country_${countryCode}` as TranslatorKey);
    }

    getLanguageName(languageCode: string) {
        return this.s(`language_${languageCode}` as TranslatorKey);
    }

    getProjectName(project: string) {
        return this.s(project as TranslatorKey);
    }
}
