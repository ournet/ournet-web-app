import { Request, Response } from "./types";
import { IHandler } from "./handler";

export interface IRoute {
    hander(req: Request, res: Response): IHandler | undefined
}

export abstract class Route<DATA=void> implements IRoute {
    constructor(private pattern: IRoutePattern<DATA>) {
    }

    hander(req: Request, res: Response) {
        const data = this.pattern.test(req.url || '');

        if (data === false) {
            return;
        }

        return this.createHander(req, res, this.formatData(data as DATA));
    }

    protected formatData(data?: DATA): DATA {
        return data as DATA;
    }

    protected abstract createHander(req: Request, res: Response, data?: DATA): IHandler
}

export interface IRoutePattern<T=void> {
    test(url: string): boolean | T
}

export class RegExpRoutePattern<T=void> implements IRoutePattern<T>{
    constructor(private regexp: RegExp, private names?: (keyof T)[]) {
    }

    test(url: string) {
        const result = this.regexp.exec(url);
        if (!result) {
            return false;
        }

        if (this.names) {
            let params: any = {};
            this.names.forEach((name, index) => params[name] = result[index + 1]);

            return params as T;
        }

        return true;
    }
}
