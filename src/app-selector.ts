import { IncomingMessage } from "http";
import * as url from 'url';
import { getHostInfo } from "./hosts";
import { OurnetProjectName } from "./ournet/data";
import { NewsOurnetApp } from "./news/app";
import env from "./env";
import { PortalOurnetApp } from "./portal/app";
import { WeatherOurnetApp } from "./weather/app";

const apps = {
    news: new NewsOurnetApp(),
    portal: new PortalOurnetApp(),
    weather: new WeatherOurnetApp(),
};

export function selectApp(req: IncomingMessage) {
    const host = url.parse(req.url || '').hostname || '';
    const info = getHostInfo(host);

    if (!env.PROJECTS.includes(info.project)) {
        throw new Error(`Unsupported project: ${info.project}`)
    }

    switch (info.project) {
        case OurnetProjectName.NEWS: return apps.news;
        case OurnetProjectName.PORTAL: return apps.portal;
        case OurnetProjectName.WEATHER: return apps.weather;
    }

    throw new Error(`Unsupported project: ${info.project}`);
}
