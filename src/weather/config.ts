import { IOurnetAppConfig } from "../ournet/config";
import { Dictionary } from "@ournet/domain";

// export const WEATHER_LOCALE_ROUTE_PREFIX = '(ru)';

export interface WeatherAppConfig extends IOurnetAppConfig {
    placesCount: number
    lists?: ConfigPlaceList[]

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
