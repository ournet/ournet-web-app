
import { NEWS_LOCALE_ROUTE_PREFIX } from "../config";
import { OurnetRouter } from "../../ournet/router";

export abstract class NewsBaseRouter<DATA=void> extends OurnetRouter<DATA> {
    static formatRouteRegExp(path: string) {
        return new RegExp(`^(?:\/${NEWS_LOCALE_ROUTE_PREFIX})?${path.replace(/\//g, '\/')}$`);
    }
}
