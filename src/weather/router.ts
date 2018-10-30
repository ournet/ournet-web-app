
import { OurnetRouter } from "../ournet/router";

export interface WeatherBaseRouterData {
    // ul: string
}

export abstract class WeatherBaseRouter<DATA extends WeatherBaseRouterData=WeatherBaseRouterData> extends OurnetRouter<DATA> {
    
}
