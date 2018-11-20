import { IAppData } from "../base/app-data";
import { GraphQLQueryExecutor, OurnetQueryApi, OurnetMutationApi } from '@ournet/api-client';
import { badImplementation } from "boom";

const executor = new GraphQLQueryExecutor(process.env.OURNET_API_HOST || 'http://ournetapi.com/graphql');

function createQueryApiClient<QT>(): OurnetQueryApi<QT> {
    return new OurnetQueryApi<QT>(executor)
}

function createMutationApiClient<QT>(): OurnetMutationApi<QT> {
    return new OurnetMutationApi<QT>(executor);
}

async function executeApiClient<APIT>(client: OurnetQueryApi<APIT>) {
    const apiResult = await client.execute();
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

export interface OurnetAppData extends IAppData {
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
