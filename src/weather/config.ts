import { OurnetAppConfig, createAppConfig } from "../ournet/config";
import { Dictionary, uniq } from "@ournet/domain";
import { OurnetProjectName } from "../ournet/data";

function getSupportedCountries() {
    return ['ro']//['md', 'ro', 'ru', 'bg', 'hu', 'in', 'cz', 'it', 'al', 'tr']
}

export const WEATHER_GLOBAL_CONFIG_LIST_IDS = uniq(getSupportedCountries()
    .map(country => createAppConfig<WeatherAppConfig>(OurnetProjectName.WEATHER, country))
    .map(config => config.lists || [])
    .reduce<string[]>((ids, list) => ids.concat(list.map(item => item.id)), []));

export interface WeatherAppConfig extends OurnetAppConfig {
    placesCount: number
    lists?: ConfigPlaceList[]
    readonly widgetGoogleAnalyticsId: string

    oneSignal?: {
        appId: string
        safari_web_id: string
    },
}

export type ConfigPlaceList = {
    id: string
    name: Dictionary<string>
    title: Dictionary<string>
    description: Dictionary<string>
    image: string
    ids: string[]
}
