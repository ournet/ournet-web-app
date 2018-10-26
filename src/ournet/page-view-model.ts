
import { IOurnetAppConfig } from "./config";
import { IOurnetAppData } from "./data";
import { OurnetViewModel, OurnetViewModelInput } from "./view-model";
import { AsyncViewModelBuilder } from "./async-view-model";
import { getSchema, getHost } from "ournet.links";


export abstract class PageViewModelBuilder<DATA extends IOurnetAppData, CONFIG extends IOurnetAppConfig, T extends PageViewModel<CONFIG>, I extends OurnetViewModelInput>
    extends AsyncViewModelBuilder<DATA, CONFIG, T, I> {

    constructor(input: I, data: DATA) {
        super(input, data);

        const model = this.model;

        model.head = {
            title: 'Ournet',
            elements: [],
        }
    }

    protected setCanonical(link: string) {
        this.model.currentLink = link;
        const { country, project } = this.model;
        this.model.head.canonical = getSchema(project, country) + '//' + getHost(project, country) + link;
    }
}

export interface PageViewModel<CONFIG extends IOurnetAppConfig> extends OurnetViewModel<CONFIG> {
    head: PageHeadViewData
    currentLink: string
}

export interface PageHeadViewData {
    title: string
    description?: string
    elements: JSX.Element[]
    canonical?: string
}
