import * as React from "react";
import { PortalBaseHandler } from "./handler";
import { IPortalAppData } from "../data";
import { AdsViewModelBuilder } from "../view-models/ads-view-model";
import AdsPage from "../views/ads/ads-page";

export class AdsHandler extends PortalBaseHandler {
  async handle(data: IPortalAppData) {
    const viewData = await new AdsViewModelBuilder(this.input, data).build();

    this.setCacheControl(60);
    return this.render(<AdsPage {...viewData} />);
  }
}
