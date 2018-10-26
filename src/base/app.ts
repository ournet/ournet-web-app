import { Request, Response } from "./types";
import { IRoute } from "./route";
import { notFound, boomify } from "boom";
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

    protected async handleError(_req: Request, res: Response, error: Error): Promise<void> {
        const boomError = boomify(error);

        res.writeHead(boomError.output.statusCode, boomError.output.headers);
        res.write(JSON.stringify(boomError.output.payload));
        res.end();
    }

    protected abstract createData(): DATA
}
