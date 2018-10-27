import { ViewModelInput, ViewModelBuilder, ViewModel } from "../base/view-model";
import { IOurnetAppConfig, createAppConfig } from "./config";
import { Sitemap, sitemap } from "ournet.links";
import { OurnetProjectName, IOurnetAppData } from "./data";
import { TranslateFunction, createAppLocale } from "./locale";
import { UrlWithParsedQuery } from "url";


export abstract class OurnetViewModelBuilder<DATA extends IOurnetAppData, CONFIG extends IOurnetAppConfig, T extends OurnetViewModel<CONFIG>, I extends OurnetViewModelInput>
    extends ViewModelBuilder<T, I> {
    protected readonly data: DATA

    constructor(input: I, data: DATA) {
        super(input);
        this.data = data;
        
        const model = this.model;

        model.project = data.project;
        model.version = data.version;
        model.country = this.input.country;

        model.config = this.createAppConfig(model.project, model.country);

        model.lang = this.getLanguage(model.config);

        model.links = sitemap(model.config.languages[0]);

        model.translate = createAppLocale(data.project, model.lang);
    }

    protected abstract getLanguage(config: CONFIG): string

    protected createAppConfig(project: OurnetProjectName, country: string) {
        return createAppConfig<CONFIG>(project, country);
    }
}

export interface OurnetViewModelInput extends ViewModelInput {
    url: UrlWithParsedQuery
    host: string
    country: string
}

export interface OurnetViewModel<CONFIG extends IOurnetAppConfig> extends ViewModel {
    config: CONFIG
    links: Sitemap
    translate: TranslateFunction
    country: string
    lang: string
    version: string
    project: OurnetProjectName
}
