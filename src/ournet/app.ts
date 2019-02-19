import { OurnetAppData, OurnetProjectName, createOurnetAppData } from "./data";
import { IRouter } from "../base/router";
import { App } from "../base/app";
import { Request, Response } from "../base/types";
import logger from "../logger";
import env from "../env";
import { boomify } from "boom";

export abstract class OurnetApp<DATA extends OurnetAppData> extends App<DATA> {
    constructor(routes: IRouter[], protected readonly project: OurnetProjectName) {
        super(routes, createOurnetAppData<DATA>(project));
    }

    protected onError(error: Error, req: Request, res: Response) {
        const error2 = boomify(error);
        res.statusCode = error2.output.statusCode;

        if (error2.output.statusCode === 404) {
            return;
        }

        logger.error(error.message, { url: req.url, ...error });
        if (!env.isProduction) {
            console.trace(error);
        }
    }
}
