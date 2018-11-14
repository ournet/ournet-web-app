import { IncomingMessage } from "http";
import { getHostInfo } from "./hosts";
import { OurnetProjectName } from "./ournet/data";
import { NewsOurnetApp } from "./news/app";
import env from "./env";
import { PortalOurnetApp } from "./portal/app";
import { WeatherOurnetApp } from "./weather/app";
import { HoroscopeOurnetApp } from "./horoscope/app";

const apps = {
    news: new NewsOurnetApp(),
    portal: new PortalOurnetApp(),
    weather: new WeatherOurnetApp(),
    horoscope: new HoroscopeOurnetApp(),
};

export function selectApp(req: IncomingMessage) {
    const host = req.headers.host || '';
    const info = getHostInfo(host);

    if (!env.PROJECTS.includes(info.project)) {
        throw new Error(`Unsupported project: ${info.project}`)
    }

    switch (info.project) {
        case OurnetProjectName.NEWS: return apps.news;
        case OurnetProjectName.PORTAL: return apps.portal;
        case OurnetProjectName.WEATHER: return apps.weather;
        case OurnetProjectName.HOROSCOPE: return apps.horoscope;
    }

    throw new Error(`Unsupported project: ${info.project}`);
}
