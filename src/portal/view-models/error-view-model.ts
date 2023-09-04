import { PortalViewModel, PortalViewModelBuilder } from "./portal-view-model";
import { OurnetViewModelInput } from "../../ournet/view-model";
import logger from "../../logger";

export interface ErrorViewModelInput extends OurnetViewModelInput {
  error: Error;
}

export interface ErrorViewModel extends PortalViewModel {
  error: Error;
}

export class ErrorViewModelBuilder extends PortalViewModelBuilder<
  ErrorViewModel,
  ErrorViewModelInput
> {
  async build() {
    this.model.error = this.input.error;

    try {
      return await super.build();
    } catch (e) {
      logger.error(e);
      return this.model;
    }
  }
}
