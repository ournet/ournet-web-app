
import { OurnetAppConfig } from "./config";
import { OurnetAppData } from "./data";
import { OurnetViewModel, OurnetViewModelInput } from "./view-model";
import { AsyncViewModelBuilder } from "./async-view-model";
import { getSchema, getHost } from "ournet.links";


export abstract class PageViewModelBuilder<DATA extends OurnetAppData, CONFIG extends OurnetAppConfig, T extends PageViewModel<CONFIG>, I extends OurnetViewModelInput>
    extends AsyncViewModelBuilder<DATA, CONFIG, T, I> {

    constructor(input: I, data: DATA) {
        super(input, data);

        const model = this.model;

        model.head = {
            title: 'Ournet',
            elements: [],
        }

        model.showGoogleAds = true;
    }

    protected setCanonical(link: string) {
        this.model.currentLink = link;
        const { country, project } = this.model;
        this.model.head.canonical = getSchema(project, country) + '//' + getHost(project, country) + link;
    }
}

export interface PageViewModel<CONFIG extends OurnetAppConfig> extends OurnetViewModel<CONFIG> {
    head: PageHeadViewData
    currentLink: string
    showGoogleAds: boolean
}

export interface PageHeadViewData {
    title: string
    description?: string
    elements: JSX.Element[]
    canonical?: string
}
