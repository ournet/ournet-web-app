
// import { PORTAL_LOCALE_ROUTE_PREFIX } from "./config";
import { OurnetRouter } from "../ournet/router";

export interface HoroscopeBaseRouterData {
    ul: string
}

export abstract class HoroscopeBaseRouter<DATA extends HoroscopeBaseRouterData=HoroscopeBaseRouterData> extends OurnetRouter<DATA> {
    
}
