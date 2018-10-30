import { Handler } from "../../base/handler";
import { IPortalAppData } from "../data";
import { OurnetViewModelInput } from "../../ournet/view-model";

export abstract class PortalBaseHandler<INPUT extends OurnetViewModelInput=OurnetViewModelInput> extends Handler<IPortalAppData, INPUT>{
    // abstract handle<DATA extends INewsAppData>(data: DATA): Promise<void>
}
