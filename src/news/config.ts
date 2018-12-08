import { OurnetAppConfig } from "../ournet/config";

export const NEWS_LOCALE_ROUTE_PREFIX = '(ru)';
export const LIST_EVENTS_FIEDLS = 'id title slug imageId summary createdAt topics {id name slug abbr}';

export interface NewsAppConfig extends OurnetAppConfig {

}
