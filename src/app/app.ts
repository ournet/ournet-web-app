import { Request, Response } from "./types";
import { IRoute } from "./route";
import { notFound } from "boom";
import { IAppData } from "./app-data";

export abstract class App<DATA extends IAppData> {

    protected readonly data: DATA

    constructor(private routes: IRoute[]) {
        this.data = this.createData();
    }

    async route(req: Request, res: Response): Promise<void> {
        for (const route of this.routes) {
            const handler = route.hander(req, res);

            if (handler) {
                try {
                    return await handler.handle(this.data);
                } catch (e) {
                    return this.handleError(req, res, e);
                }
            }
        }

        return this.handleError(req, res, notFound());
    }

    protected abstract handleError(req: Request, res: Response, error: Error): Promise<void>

    protected abstract createData(): DATA
}
