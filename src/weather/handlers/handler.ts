import { Handler } from "../../base/handler";
import { WeatherAppData } from "../data";
import { OurnetViewModelInput } from "../../ournet/view-model";

export abstract class WeatherBaseHandler<INPUT extends OurnetViewModelInput=OurnetViewModelInput> extends Handler<WeatherAppData, INPUT>{
    // abstract handle<DATA extends INewsAppData>(data: DATA): Promise<void>
}
