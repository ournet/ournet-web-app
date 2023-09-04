import { Handler } from "../../base/handler";
import { NewsAppData } from "../data";
import { OurnetViewModelInput } from "../../ournet/view-model";

export abstract class NewsBaseHandler<
  INPUT extends OurnetViewModelInput = OurnetViewModelInput
> extends Handler<NewsAppData, INPUT> {}
