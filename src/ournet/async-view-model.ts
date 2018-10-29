
import { OurnetQueryApi } from "@ournet/api-client";
import { OurnetViewModel, OurnetViewModelBuilder, OurnetViewModelInput } from "./view-model";
import { IOurnetAppConfig } from "./config";
import { IOurnetAppData } from "./data";

export abstract class AsyncViewModelBuilder<DATA extends IOurnetAppData, CONFIG extends IOurnetAppConfig, T extends OurnetViewModel<CONFIG>, I extends OurnetViewModelInput>
    extends OurnetViewModelBuilder<DATA, CONFIG, T, I> {

    protected apiClient: OurnetQueryApi<T>;

    constructor(input: I, data: DATA) {
        super(input, data);
        this.apiClient = data.createQueryApiClient<T>();
    }

    async build() {
        const data = await this.executeApiClient(this.apiClient);
        return this.formatModelData(data);
    }

    protected formatModelData(data: T): T {
        const anyData = data as any;
        const anyModel = this.model as any;
        for (const key in anyData) {
            anyModel[key] = anyData[key];
        }

        return this.model;
    }

    protected async executeApiClient<APIT>(api: OurnetQueryApi<APIT>) {
        return this.data.executeApiClient<APIT>(api);
    }
}
