
import { ViewModelInput } from "../base/view-model";
import { IOurnetAppConfig } from "./app-config";
import { IOurnetAppData } from "./app-data";
import { OurnetViewModel } from "./view-model";
import { AsyncViewModelBuilder } from "./async-view-model";
import { getSchema, getHost } from "ournet.links";


export abstract class PageViewModelBuilder<DATA extends IOurnetAppData, CONFIG extends IOurnetAppConfig, T extends PageViewModel<CONFIG>, I extends ViewModelInput>
    extends AsyncViewModelBuilder<DATA, CONFIG, T, I> {

    protected initModel() {
        const model = super.initModel();

        model.head = {
            title: 'Ournet',
            elements: [],
        }

        return model;
    }

    setCanonical(link: string) {
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
