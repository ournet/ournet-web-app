
import { OurnetQueryApi } from "@ournet/api-client";
import { OurnetViewModel, OurnetViewModelBuilder } from "./view-model";
import { IOurnetAppConfig } from "./app-config";
import { ViewModelInput } from "../app/view-model";
import { IOurnetAppData } from "./app-data";

export abstract class AsyncViewModelBuilder<DATA extends IOurnetAppData, CONFIG extends IOurnetAppConfig, T extends OurnetViewModel<CONFIG>, I extends ViewModelInput>
    extends OurnetViewModelBuilder<DATA, CONFIG, T, I> {

    protected apiClient: OurnetQueryApi<T>;

    constructor(input: I, data: DATA) {
        super(input, data);
        this.apiClient = data.createQueryApiClient<T>();
    }

    async build() {
        const data = await this.executeApiClient(this.apiClient);
        return this.formatModel(data);
    }

    protected formatModel(data: T): T {
        const anyData = data as any;
        const anyModel = this.model as any;
        for (const key in anyData) {
            anyModel[key] = anyData[key];
        }

        return this.model;
        // return { ...this.model as any, ...data as any };
    }

    protected async executeApiClient<APIT>(api: OurnetQueryApi<APIT>) {
        return this.data.executeApiClient<APIT>(api);
    }
}
