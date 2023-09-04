import { PORTAL_LOCALE_ROUTE_PREFIX } from "./config";
import { OurnetRouter } from "../ournet/router";

export interface PortalBaseRouterData {
  ul: string;
}

export abstract class PortalBaseRouter<
  DATA extends PortalBaseRouterData = PortalBaseRouterData
> extends OurnetRouter<DATA> {
  constructor(path: string, names?: (keyof DATA)[]) {
    if (names) {
      names.unshift("ul");
    }
    super(`(?:/${PORTAL_LOCALE_ROUTE_PREFIX})?${path}`, names);
  }
}
