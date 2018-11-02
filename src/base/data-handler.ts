import { Handler, HandlerInput } from "./handler";
import { IAppData } from "./app-data";
import { Dictionary } from "@ournet/domain";

export interface DataHandlerInput extends HandlerInput {
    data: any
    code: number
    headers?: Dictionary<string>
}

export class DataHandler<DATA extends IAppData=IAppData, INPUT extends DataHandlerInput=DataHandlerInput>
    extends Handler<DATA, INPUT>{
    handle(): Promise<void> {
        return this.send(this.input.data, this.input.code, this.input.headers);
    }
}
