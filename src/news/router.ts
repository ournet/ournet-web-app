
import { NEWS_LOCALE_ROUTE_PREFIX } from "./config";
import { OurnetRouter } from "../ournet/router";

export interface NewsBaseRouterData {
    ul: string
}

export abstract class NewsBaseRouter<DATA extends NewsBaseRouterData=NewsBaseRouterData> extends OurnetRouter<DATA> {
    constructor(path: string, names?: (keyof DATA)[]) {
        if (names) {
            names.unshift('ul');
        }
        super(`(?:/${NEWS_LOCALE_ROUTE_PREFIX})?${path}`, names);
    }
}
