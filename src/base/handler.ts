import { Request, Response } from "./types";
import { IAppData } from "./app-data";
import { ReactElement } from "react";
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

    protected render(res: Response, page: ReactElement<any>, code?: number) {
        const text = '<!DOCTYPE html>' + renderToStaticMarkup(page);
        return this.send(res, text, code);
    }

    protected send(res: Response, data: any, code?: number) {
        return send(res, code || 200, data);
    }
}
