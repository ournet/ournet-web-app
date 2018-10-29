import { Request, Response } from "./types";
import { IAppData } from "./app-data";
import { renderToStaticMarkup } from 'react-dom/server';
import { send } from "micro";

export interface IHandler<DATA extends IAppData> {
    handle(data: DATA): Promise<void>
}

export interface HandlerInput {
    readonly req: Request
    readonly res: Response
}

export abstract class Handler<DATA extends IAppData, INPUT extends HandlerInput> implements IHandler<DATA> {
    constructor(protected input: INPUT) {
    }

    abstract handle(data: DATA): Promise<void>

    protected render(res: Response, page: JSX.Element, statusCode?: number, headers?: { [name: string]: string }) {
        statusCode = statusCode || 200;

        const text = '<!DOCTYPE html>' + renderToStaticMarkup(page);
        return this.send(res, text, statusCode, headers);
    }

    protected send(res: Response, data: any, code: number, headers?: { [name: string]: string }) {
        if (headers) {
            for (var prop in headers) {
                res.setHeader(prop, headers[prop]);
            }
        }
        return send(res, code, data);
    }

    protected redirect(res: Response, location: string, code: number, headers?: { [name: string]: string }) {
        headers = headers || {};
        headers['location'] = location;

        return this.send(res, null, code, headers);
    }
}
