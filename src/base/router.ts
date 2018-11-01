
// const debug = require('debug')('ournet:web-app');

import { Request, Response } from "./types";
import { IHandler } from "./handler";
import { parse } from "url";

export interface IRouter {
    hander(req: Request, res: Response): IHandler<any> | undefined
}

export abstract class Router<DATA=void> implements IRouter {
    constructor(private pattern: IRoutePattern<DATA>) {
    }

    hander(req: Request, res: Response) {
        const url = parse(req.url || '');
        const data = this.pattern.test(url.pathname || '');

        if (data === false) {
            return;
        }

        return this.createHander(req, res, this.formatData(data as DATA));
    }

    protected formatData(data?: DATA): DATA {
        return data as DATA;
    }

    protected parseUrl(urlOrRequest: string | Request) {
        const url = typeof urlOrRequest === 'string' ? urlOrRequest : urlOrRequest.url || '';
        return parse(url, true);
    }

    protected abstract createHander(req: Request, res: Response, data?: DATA): IHandler<any>
}

export interface IRoutePattern<T=void> {
    test(url: string): boolean | T
}

export class RegExpRoutePattern<T=void> implements IRoutePattern<T>{
    constructor(private regexp: RegExp, private names?: (keyof T)[]) {
    }

    test(url: string) {
        url = url.replace(/\/{2,}/g, '/');

        const result = this.regexp.exec(url);
        if (!result) {
            // debug(`Route NOT pass: ${this.regexp}, ${url}`);
            return false;
        }

        // debug(`Route pass: ${this.regexp}, ${url}, ${result}`);

        if (this.names) {
            let params: any = {};
            this.names.forEach((name, index) => params[name] = result[index + 1]);

            return params as T;
        }

        return true;
    }
}
