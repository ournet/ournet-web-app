import { WeatherBaseHandler } from "./handler";
import { WeatherAppData } from "../data";
import { Place } from "@ournet/api-client";
import { getSchema, sitemap, getHost } from "ournet.links";
import { OurnetViewModelInput } from "../../ournet/view-model";
const sm = require('sitemap');

export class SitemapRegionIndexHandler extends WeatherBaseHandler {
    async handle(data: WeatherAppData): Promise<void> {
        const { country, project, } = this.input;
        const schema = getSchema(project, country);
        const host = getHost(project, country);
        const api = data.createQueryApiClient<{ regions: Place[] }>();
        const config = this.createAppConfig();
        const links = sitemap(config.languages[0]);
        const lang = this.getLanguage(config);


        api.placesAdmin1s('regions', { fields: 'id name names admin1Code featureClass' }, { country, limit: 100 });

        const result = await data.executeApiClient(api);

        const fullLink = (link: string) => `${schema}//${host}${link}`;

        const siteMap = sm.buildSitemapIndex({
            // cacheTime: ms('30d'),
            // hostname: `${schema}//${host}`,
            // sitemapName: 'sitemap-region-index',
            urls: result.regions.map(item => fullLink(links.weather.sitemap.regionPlaces(item.admin1Code, { ul: lang })))
        });

        return this.send(siteMap.toString(), 200, { 'content-type': 'text/xml; charset=utf-8' });
    }
}

export interface SitemapRegionPlacesModelInput extends OurnetViewModelInput {
    admin1Code: string
}

export class SitemapRegionPlacesHandler extends WeatherBaseHandler<SitemapRegionPlacesModelInput> {
    async handle(data: WeatherAppData): Promise<void> {
        const { country, project, admin1Code } = this.input;
        const schema = getSchema(project, country);
        const host = getHost(project, country);
        const api = data.createQueryApiClient<{ places: Place[] }>();
        const config = this.createAppConfig();
        const links = sitemap(config.languages[0]);
        const lang = this.getLanguage(config);


        api.placesPlacesByAdmin1Code('places', { fields: 'id name featureCode population' }, { country, admin1Code, limit: 1000 });

        const result = await data.executeApiClient(api);

        const fullLink = (link: string) => `${schema}//${host}${link}`;
        const date = new Date();

        const siteMap = sm.createSitemap({
            // cacheTime: ms('30d'),
            // hostname: `${schema}//${host}`,
            // sitemapName: 'sitemap-region-index',
            urls: result.places.map(item => ({
                url: fullLink(links.weather.place(item.id, { ul: lang })),
                priority: getPlacePiority(item),
                lastmodISO: date.toISOString(),
            }))
        });

        return this.send(siteMap.toString(), 200, { 'content-type': 'text/xml; charset=utf-8' });
    }
}

function getPlacePiority(place: Place) {
    const code = place.featureCode || '';
    if (['PPLC', 'PPLA'].includes(code)) {
        return 1;
    }
    if (['AIRP'].includes(code)) {
        return .9;
    }
    if (place.population) {
        if (place.population > 1e6) {
            return 0.9;
        }
        if (place.population > 1e5) {
            return 0.8;
        }
        if (place.population > 5e4) {
            return 0.7;
        }
        if (place.population > 1e4) {
            return 0.6;
        }
    }
    return 0.5;
}
