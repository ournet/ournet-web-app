import { ViewModelInput, ViewModelBuilder, ViewModel } from "../base/view-model";
import { OurnetAppConfig, createAppConfig } from "./config";
import { Sitemap, sitemap } from "ournet.links";
import { OurnetProjectName, OurnetAppData } from "./data";
import { UrlWithParsedQuery } from "url";
import { ParsedUrlQuery } from "querystring";
import { OurnetLocales, OURNET_TRANSLATOR } from "../locales";


export class OurnetViewModelBuilder<DATA extends OurnetAppData, CONFIG extends OurnetAppConfig, T extends OurnetViewModel<CONFIG>, I extends OurnetViewModelInput>
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

        model.locales = OURNET_TRANSLATOR.locales(model.lang);

        model.containsProject = (project: OurnetProjectName) => model.config.projects.includes(project);
    }

    protected getLanguage(config: CONFIG) {
        return getLanguageFromQueryString(config, this.input.url.query);
    }

    protected createAppConfig(project: OurnetProjectName, country: string) {
        return createAppConfig<CONFIG>(project, country);
    }
}

export interface OurnetViewModelInput extends ViewModelInput {
    url: UrlWithParsedQuery
    host: string
    country: string
    project: OurnetProjectName
}

export interface OurnetViewModel<CONFIG extends OurnetAppConfig> extends ViewModel {
    config: CONFIG
    links: Sitemap
    locales: OurnetLocales
    country: string
    lang: string
    version: string
    project: OurnetProjectName
    containsProject: (project: OurnetProjectName) => boolean
}

export function getLanguageFromQueryString(config: OurnetAppConfig, query: ParsedUrlQuery) {
    let lang = query['ul'] as string;
    lang = lang && lang.trim().toLowerCase();

    if (lang && config.languages.includes(lang)) {
        return lang;
    }

    return config.languages[0];
}
