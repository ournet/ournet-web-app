import { Handler } from "../../base/handler";
import { HoroscopeAppData } from "../data";
import { OurnetViewModelInput } from "../../ournet/view-model";

export abstract class HoroscopeBaseHandler<INPUT extends OurnetViewModelInput=OurnetViewModelInput> extends Handler<HoroscopeAppData, INPUT>{
    // abstract handle<DATA extends INewsAppData>(data: DATA): Promise<void>
}
