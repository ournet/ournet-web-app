import { ViewModelInput, ViewModelBuilder, ViewModel } from "../base/view-model";
import { IOurnetAppConfig, createAppConfig } from "./app-config";
import { Sitemap, sitemap } from "ournet.links";
import { OurnetProjectName, IOurnetAppData } from "./app-data";
import { ITranslateFunction, createAppLocale, Locale } from "./app-locale";


export abstract class OurnetViewModelBuilder<DATA extends IOurnetAppData, CONFIG extends IOurnetAppConfig, T extends OurnetViewModel<CONFIG>, I extends ViewModelInput>
    extends ViewModelBuilder<T, I> {

    constructor(input: I, protected readonly data: DATA) {
        super(input);
    }

    protected initModel() {
        const model = super.initModel();

        model.project = this.data.project;

        const locale = this.getLocale();
        model.locale = locale;
        model.country = locale.country;
        model.lang = locale.lang;

        model.config = this.createAppConfig(locale.country);

        model.links = sitemap(model.config.languages[0]);

        model.translate = createAppLocale(this.data.project, locale.lang);

        return model;
    }

    protected abstract getLocale(): Locale

    protected createAppConfig(country: string) {
        return createAppConfig<CONFIG>(this.data.project, country);
    }
}

export interface OurnetViewModel<CONFIG extends IOurnetAppConfig> extends ViewModel {
    config: CONFIG
    links: Sitemap
    translate: ITranslateFunction
    locale: Locale
    country: string
    lang: string

    project: OurnetProjectName
}
