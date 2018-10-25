import { Request, Response } from "./types";
import { IAppApi } from "./app-api";

export interface IHandler {
    handle<API extends IAppApi>(api: API): Promise<void>
}

export interface HandlerInput {
    readonly req: Request
    readonly res: Response
}

export abstract class Handler<INPUT extends HandlerInput> implements IHandler {
    constructor(protected input: INPUT) {
    }

    abstract handle<API extends IAppApi>(api: API): Promise<void>
}
