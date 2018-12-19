import { Request, Response } from "./types";
import { AppData } from "./app-data";
import { renderToStaticMarkup } from 'react-dom/server';
import { send } from "micro";
import env from "../env";

export interface IHandler<DATA extends AppData> {
    handle(data: DATA): Promise<void>
}

export interface HandlerInput {
    readonly req: Request
    readonly res: Response
}

export abstract class Handler<DATA extends AppData, INPUT extends HandlerInput> implements IHandler<DATA> {
    constructor(protected input: INPUT) {
    }

    abstract handle(data: DATA): Promise<void>

    protected render(page: JSX.Element, statusCode?: number, headers?: { [name: string]: string }) {
        statusCode = statusCode || 200;

        const text = '<!DOCTYPE html>' + renderToStaticMarkup(page);
        return this.send(text, statusCode, headers);
    }

    protected send(data: any, code: number, headers?: { [name: string]: string }) {
        if (headers) {
            for (var prop in headers) {
                this.input.res.setHeader(prop, headers[prop]);
            }
        }
        return send(this.input.res, code, data);
    }

    protected redirect(location: string, code: number, headers?: { [name: string]: string }) {
        headers = headers || {};
        headers['location'] = location.trim().replace(/[\r\n]/g, '');

        return this.send(null, code, headers);
    }

    /**
     * Set response Cache-Control
     * @maxage integet in minutes
     */
    setCacheControl(maxage: number) {
        // maxage = 0;
        let cache = 'private, max-age=0, no-cache';
        if (env.isProduction && maxage > 0) {
            cache = 'public, max-age=' + (maxage * 60);
        }
        this.input.res.setHeader('Cache-Control', cache);
    }

}
