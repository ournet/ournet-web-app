import { AppData } from "../base/app-data";
import { CacheGraphQlQueryExecutor, OurnetQueryApi, OurnetMutationApi, OurnetQueryMethods } from '@ournet/api-client';
import { badImplementation } from "boom";
import { Dictionary } from "@ournet/domain";
import ms = require('ms');

const cacheOptions: Dictionary<{ max: number, ttl: number }> = {}

cacheOptions[OurnetQueryMethods.news_trendingTopics] = { max: 20, ttl: ms('10m') };
cacheOptions[OurnetQueryMethods.news_eventsLatest] = { max: 20, ttl: ms('5m') };
cacheOptions[OurnetQueryMethods.news_eventsLatestByTopic] = { max: 150, ttl: ms('10m') };
cacheOptions[OurnetQueryMethods.weather_nowPlaceForecast] = { max: 50, ttl: ms('30m') };
cacheOptions[OurnetQueryMethods.weather_datePlacesForecast] = { max: 100, ttl: ms('1h') };
cacheOptions[OurnetQueryMethods.places_placeById] = { max: 500, ttl: ms('30m') };
cacheOptions[OurnetQueryMethods.places_mainPlaces] = { max: 50, ttl: ms('2h') };
cacheOptions[OurnetQueryMethods.places_placesByIds] = { max: 100, ttl: ms('1h') };
cacheOptions[OurnetQueryMethods.quotes_latest] = { max: 20, ttl: ms('10m') };
cacheOptions[OurnetQueryMethods.topics_topicsByIds] = { max: 50, ttl: ms('1h') };
cacheOptions[OurnetQueryMethods.topics_topicById] = { max: 100, ttl: ms('1h') };

const executor = new CacheGraphQlQueryExecutor({ url: process.env.OURNET_API_HOST || '', timeout: 1000 * 4 }, cacheOptions);

function createQueryApiClient<QT>(): OurnetQueryApi<QT> {
    return new OurnetQueryApi<QT>(executor)
}

function createMutationApiClient<QT>(): OurnetMutationApi<QT> {
    return new OurnetMutationApi<QT>(executor);
}

async function executeApiClient<APIT>(client: OurnetQueryApi<APIT>) {
    if (!client.queryHasItems()) {
        return {} as APIT;
    }
    const apiResult = await client.queryExecute();
    if (apiResult.errors) {
        throw badImplementation(apiResult.errors[0].message);
    }
    return apiResult.data;
}

export enum OurnetProjectName {
    PORTAL = 'portal',
    WEATHER = 'weather',
    NEWS = 'news',
    HOROSCOPE = 'horoscope',
    EXCHANGE = 'exchange',
}

export interface OurnetAppData extends AppData {
    readonly project: OurnetProjectName
    readonly createQueryApiClient: typeof createQueryApiClient
    readonly createMutationApiClient: typeof createMutationApiClient
    readonly executeApiClient: typeof executeApiClient
    readonly version: string
}


export function createOurnetAppData<T extends OurnetAppData>
    (project: OurnetProjectName) {
    const data = {
        project,
        createQueryApiClient: createQueryApiClient,
        createMutationApiClient: createMutationApiClient,
        executeApiClient: executeApiClient,
        version: require('../../package.json').version,
    } as T;

    return data;
}
