import { WeatherBaseRouter, WeatherBaseRouterData } from "../router";
import { Request, Response } from "../../base/types";
import { SitemapRegionIndexHandler, SitemapRegionPlacesModelInput, SitemapRegionPlacesHandler } from "../handlers/sitemap-handler";
import ms = require("ms");

export class SitemapRegionIndexRouter extends WeatherBaseRouter {
    constructor() {
        super('/sitemap-region-index.xml')
    }

    protected createHander(req: Request, res: Response) {
        const input = this.formatInput(req, res);
        const handler = new SitemapRegionIndexHandler(input);
        handler.setCacheControl(ms('30d') / 1000 / 60);

        return handler;
    }
}

interface SitemapRegionPlacesData extends WeatherBaseRouterData {
    admin1Code: string
}

export class SitemapRegionPlacesRouter extends WeatherBaseRouter<SitemapRegionPlacesData> {
    constructor() {
        super('/sitemap-region-places-([\\d\\w]+).xml', ['admin1Code'])
    }

    protected createHander(req: Request, res: Response, data: SitemapRegionPlacesData) {
        const input = this.formatInput<SitemapRegionPlacesModelInput>(req, res);
        input.admin1Code = data.admin1Code;
        const handler = new SitemapRegionPlacesHandler(input);

        handler.setCacheControl(60 * 1);

        return handler;
    }
}