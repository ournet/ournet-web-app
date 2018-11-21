
import { HOROSCOPE_LOCALE_ROUTE_PREFIX } from "./config";
import { OurnetRouter } from "../ournet/router";

export interface HoroscopeBaseRouterData {
    ul: string
}

export abstract class HoroscopeBaseRouter<DATA extends HoroscopeBaseRouterData=HoroscopeBaseRouterData> extends OurnetRouter<DATA> {
    constructor(path: string, names?: (keyof DATA)[]) {
        if (names) {
            names.unshift('ul');
        }
        super(`(?:/${HOROSCOPE_LOCALE_ROUTE_PREFIX})?${path}`, names);
    }
}
