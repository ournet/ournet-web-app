import { Handler } from "../../base/handler";
import { WeatherAppData } from "../data";
import { OurnetViewModelInput, getLanguageFromQueryString } from "../../ournet/view-model";
import { OurnetAppConfig, createAppConfig } from "../../ournet/config";
import { OurnetProjectName } from "../../ournet/data";

export abstract class WeatherBaseHandler<INPUT extends OurnetViewModelInput=OurnetViewModelInput> extends Handler<WeatherAppData, INPUT>{
    // abstract handle<DATA extends INewsAppData>(data: DATA): Promise<void>

    protected createAppConfig<CONFIG extends OurnetAppConfig=OurnetAppConfig>(country?: string) {
        return createAppConfig<CONFIG>(OurnetProjectName.WEATHER, country || this.input.country);
    }

    protected getLanguage(config: OurnetAppConfig) {
        return getLanguageFromQueryString(config, this.input.url.query);
    }
}
