import { OurnetAppData, OurnetProjectName, createOurnetAppData } from "./data";
import { IRouter } from "../base/router";
import { App } from "../base/app";
import { Request } from "../base/types";
import logger from "../logger";
import env from "../env";

export abstract class OurnetApp<DATA extends OurnetAppData> extends App<DATA> {
    constructor(routes: IRouter[], protected readonly project: OurnetProjectName) {
        super(routes, createOurnetAppData<DATA>(project));
    }

    protected logError(error: Error, req: Request) {
        logger.error(error.message, { url: req.url, ...error });
        if (!env.isProduction) {
            console.trace(error);
        }
    }
}
