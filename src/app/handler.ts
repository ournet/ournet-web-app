import { Request, Response } from "./types";
import { IAppData } from "./app-data";

export interface IHandler {
    handle<DATA extends IAppData>(data: DATA): Promise<void>
}

export interface HandlerInput {
    readonly req: Request
    readonly res: Response
}

export abstract class Handler<INPUT extends HandlerInput> implements IHandler {
    constructor(protected input: INPUT) {
    }

    abstract handle<DATA extends IAppData>(data: DATA): Promise<void>
}
