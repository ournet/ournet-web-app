
import { NEWS_LOCALE_ROUTE_PREFIX } from "./config";
import { OurnetRouter } from "../ournet/router";
import { RegExpRoutePattern } from "../base/router";

export interface NewsBaseRouterData {
    ul: string
}

export abstract class NewsBaseRouter<DATA extends NewsBaseRouterData=NewsBaseRouterData> extends OurnetRouter<DATA> {
    constructor(path: string, names?: (keyof DATA)[]) {
        if (names) {
            names.unshift('ul');
        }
        super(new RegExpRoutePattern(NewsBaseRouter.formatRouteRegExp(path), names));
    }
    static formatRouteRegExp(path: string) {
        return OurnetRouter.formatRouteRegExp(`(?:/${NEWS_LOCALE_ROUTE_PREFIX})?${path}`);
    }
}
