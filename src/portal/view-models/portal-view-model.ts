import { IPortalAppConfig } from "../config";
import { IPortalAppData } from "../data";
import { OurnetViewModelInput } from "../../ournet/view-model";
import {
  OurnetPageViewModel,
  OurnetPageViewModelBuilder
} from "../../ournet/ournet-page-view-model";

export class PortalViewModelBuilder<
  T extends PortalViewModel,
  I extends OurnetViewModelInput
> extends OurnetPageViewModelBuilder<IPortalAppData, IPortalAppConfig, T, I> {}

export interface PortalViewModel
  extends OurnetPageViewModel<IPortalAppConfig> {}
