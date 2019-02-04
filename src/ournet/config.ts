import { OurnetProjectName } from "./data";

export interface OurnetAppConfig {
    readonly background_color: string
    readonly theme_color: string
    readonly email: string
    readonly domain: string
    readonly languages: string[]
    readonly googleAnalyticsId: string
    readonly timezone: string
    readonly projects: OurnetProjectName[]
    readonly capitalId: string
    readonly shareServices: string[]
    readonly internationalIds: string[]
    readonly facebookAppId?: string
    readonly facebookPageUrl?: string
    readonly disabledAds?: boolean

    readonly oneSignal?: {
        appId: string
        safari_web_id: string
    }
}

export function createAppConfig<T extends OurnetAppConfig>(project: OurnetProjectName, country: string) {
    const config = require(`../../config/${project}/${country}.json`);

    return config as T;
}
