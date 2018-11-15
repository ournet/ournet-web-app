import { OurnetRouter } from "../../ournet/router";
import { Request, Response } from "../../base/types";
import { RedirectHandler } from "../../base/redirect-handler";
import { createAppConfig } from "../../ournet/config";
import { sitemap } from "ournet.links";
import { getLanguageFromQueryString } from "../../ournet/view-model";
import { WidgetOldPlaceHandler } from "../handlers/widget-old-place-handler";


export class Widget2RedirectRouter extends OurnetRouter {
    constructor() {
        super('/widget2')
    }
    protected createHander(req: Request, res: Response) {
        const input = this.formatInput(req, res);
        const config = createAppConfig(input.project, input.country);
        const links = sitemap(config.languages[0]);
        const lang = getLanguageFromQueryString(config, input.url.query);

        const handler = new RedirectHandler({ code: 301, location: links.weather.widget({ ul: lang }), req, res });

        handler.setCacheControl(60 * 24);

        return handler;
    }
}

const ROUTE_PREFIX = '(prognoza|pogoda|vremea|forecast|tempo|pocasi|elorejelzes|mot)';

interface PrefixRedirectRouterData {
    prefix: string
}

export class PrefixPlacesRedirectRouter extends OurnetRouter {
    constructor() {
        super(`/${ROUTE_PREFIX}/places`)
    }
    protected createHander(req: Request, res: Response) {
        const input = this.formatInput(req, res);
        const config = createAppConfig(input.project, input.country);
        const links = sitemap(config.languages[0]);
        const lang = getLanguageFromQueryString(config, input.url.query);

        const handler = new RedirectHandler({ code: 301, location: links.weather.places({ ul: lang }), req, res });

        handler.setCacheControl(60 * 24);

        return handler;
    }
}

interface PrefixPlacesRedirectRouterData extends PrefixRedirectRouterData {
    admin1Code: string
}

export class PrefixPlacesAdminRedirectRouter extends OurnetRouter<PrefixPlacesRedirectRouterData> {
    constructor() {
        super(`/${ROUTE_PREFIX}/places/([^/]+)`, ['prefix', 'admin1Code'])
    }
    protected createHander(req: Request, res: Response, data: PrefixPlacesRedirectRouterData) {
        const input = this.formatInput(req, res);
        const config = createAppConfig(input.project, input.country);
        const links = sitemap(config.languages[0]);
        const lang = getLanguageFromQueryString(config, input.url.query);

        const handler = new RedirectHandler({ code: 301, location: links.weather.places.byAdm1(data.admin1Code, { ul: lang }), req, res });

        handler.setCacheControl(60 * 24);

        return handler;
    }
}

interface PrefixPlaceRedirectRouterData extends PrefixRedirectRouterData {
    placeId: string
}

export class PrefixPlaceRedirectRouter extends OurnetRouter<PrefixPlaceRedirectRouterData> {
    constructor() {
        super(`/${ROUTE_PREFIX}/(\\d+)`, ['prefix', 'placeId'])
    }
    protected createHander(req: Request, res: Response, data: PrefixPlaceRedirectRouterData) {
        const input = this.formatInput(req, res);
        const config = createAppConfig(input.project, input.country);
        const links = sitemap(config.languages[0]);
        const lang = getLanguageFromQueryString(config, input.url.query);

        const handler = new RedirectHandler({ code: 301, location: links.weather.place(data.placeId, { ul: lang }), req, res });

        handler.setCacheControl(60 * 24);

        return handler;
    }
}

export class Place10DaysRedirectRouter extends OurnetRouter<PrefixPlaceRedirectRouterData> {
    constructor() {
        super(`/(\\d+)/\\w+`, ['placeId'])
    }
    protected createHander(req: Request, res: Response, data: PrefixPlaceRedirectRouterData) {
        const input = this.formatInput(req, res);
        const config = createAppConfig(input.project, input.country);
        const links = sitemap(config.languages[0]);
        const lang = getLanguageFromQueryString(config, input.url.query);

        const handler = new RedirectHandler({ code: 301, location: links.weather.place(data.placeId, { ul: lang }), req, res });

        handler.setCacheControl(60 * 24);

        return handler;
    }
}

export class PrefixOldWidgetRedirectRouter extends OurnetRouter {
    constructor() {
        super(`/${ROUTE_PREFIX}/widget/widgetframe`)
    }
    protected createHander(req: Request, res: Response) {
        const input = this.formatInput(req, res);

        const handler = new WidgetOldPlaceHandler({
            country: input.country,
            host: input.host,
            id: parseInt(input.url.query.id as string),
            project: input.project,
            url: input.url, req, res
        });

        handler.setCacheControl(60 * 24);

        return handler;
    }
}

