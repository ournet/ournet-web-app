import { Request, Response } from "./types";
import { IRouter } from "./router";
import { notFound, boomify } from "boom";
import { AppData } from "./app-data";
import env from "../env";

export abstract class App<DATA extends AppData> {
  constructor(private routes: IRouter[], protected readonly data: DATA) {}

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

  protected async handleError(
    _req: Request,
    res: Response,
    error: Error
  ): Promise<void> {
    const boomError = boomify(error);
    res.writeHead(boomError.output.statusCode, boomError.output.headers);

    if (!env.isProduction) {
      console.trace(error);
      res.write(JSON.stringify(boomError.output.payload));
    }

    res.end();
  }
}
