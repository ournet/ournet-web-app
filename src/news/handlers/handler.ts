import { Handler } from "../../base/handler";
import { INewsAppData } from "../data";
import { OurnetViewModelInput } from "../../ournet/view-model";

export abstract class NewsBaseHandler<INPUT extends OurnetViewModelInput=OurnetViewModelInput> extends Handler<INewsAppData, INPUT>{
    // abstract handle<DATA extends INewsAppData>(data: DATA): Promise<void>
}
