import { PortalViewModelBuilder, PortalViewModel } from "./portal-view-model";
import { OurnetViewModelInput } from "../../ournet/view-model";

export class AdsViewModelBuilder extends PortalViewModelBuilder<
  PortalViewModel,
  OurnetViewModelInput
> {
  build() {
    const { lang, links, country, locales, head, project } = this.model;

    head.title =
      locales.advertising() + " - " + locales.getAppName(project, country);

    this.setCanonical(links.portal.ads({ ul: lang }));

    return super.build();
  }
}
