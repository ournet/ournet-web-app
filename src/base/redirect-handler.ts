import { Handler, HandlerInput } from "./handler";
import { IAppData } from "./app-data";
import { Dictionary } from "@ournet/domain";

export interface RedirectHandlerInput extends HandlerInput {
    location: string
    code: number
    headers?: Dictionary<string>
}

export class RedirectHandler<DATA extends IAppData=IAppData, INPUT extends RedirectHandlerInput=RedirectHandlerInput>
    extends Handler<DATA, INPUT>{
    handle(_data: DATA): Promise<void> {
        return this.redirect(this.input.location, this.input.code, this.input.headers);
    }
}
