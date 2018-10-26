import { OurnetProjectName } from "./app-data";

export interface IOurnetAppConfig {
    readonly email: string
    readonly domain: string
    readonly languages: string[]
    readonly googleAnalyticsId: string
    readonly timezone: string
    readonly projects: OurnetProjectName[]
    readonly capitalId: string
    readonly shareServices: string[]
}

export function createAppConfig<T extends IOurnetAppConfig>(project: OurnetProjectName, country: string) {
    const baseConfig = require(`../../data/config/base/${country}.json`);
    const projectConfig = require(`../../data/config/${project}/${country}.json`);

    return { ...baseConfig, ...projectConfig } as T;
}
