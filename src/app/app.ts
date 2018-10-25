import { Request, Response } from "./types";
import { IRoute } from "./route";
import { notFound } from "boom";
import { IAppApi } from "./app-api";

export abstract class App<API extends IAppApi> {

    protected readonly api: API

    constructor(private routes: IRoute[]) {
        this.api = this.createApi();
    }

    async route(req: Request, res: Response): Promise<void> {
        for (const route of this.routes) {
            const handler = route.hander(req, res);

            if (handler) {
                try {
                    return await handler.handle(this.api);
                } catch (e) {
                    return this.handleError(req, res, e);
                }
            }
        }

        return this.handleError(req, res, notFound());
    }

    protected abstract handleError(req: Request, res: Response, error: Error): Promise<void>

    protected abstract createApi(): API
}
