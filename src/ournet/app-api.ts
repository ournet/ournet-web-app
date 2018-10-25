import { IAppApi } from "../app/app-api";
import { getHost, getSchema } from 'ournet.links';
import { GraphQLQueryExecutor, OurnetQueryApi, OurnetMutationApi } from '@ournet/api-client';

const executor = new GraphQLQueryExecutor(process.env.OURNET_API_HOST || 'http://ournetapi.com/graphql');

function createQueryApiClient<QT>(): OurnetQueryApi<QT> {
    return new OurnetQueryApi<QT>(executor)
}

function createMutationApiClient<QT>(): OurnetMutationApi<QT> {
    return new OurnetMutationApi<QT>(executor);
}

export enum OurnetProjectName {
    PORTAL = 'portal',
    WEATHER = 'weather',
    NEWS = 'news',
    HOROSCOPE = 'horoscope',
    EXCHANGE = 'exchange',
}

export interface IOurnetAppApi extends IAppApi {
    readonly project: OurnetProjectName
    readonly getSchema: typeof getSchema
    readonly getHost: typeof getHost
    readonly createQueryApiClient: typeof createQueryApiClient
    readonly createMutationApiClient: typeof createMutationApiClient
}


export function createOurnetAppApi<T extends IOurnetAppApi>
    (project: OurnetProjectName) {
    const api = {
        project,
        getSchema: getSchema,
        getHost: getHost,
        createQueryApiClient: createQueryApiClient,
        createMutationApiClient: createMutationApiClient,
    } as T;

    return api;
}