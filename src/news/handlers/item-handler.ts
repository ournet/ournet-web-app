import { NewsBaseHandler } from "./handler";
import { NewsAppData } from "../data";
import {
  ItemViewModelBuilder,
  ItemViewModelInput
} from "../view-models/item-view-model";

export class ItemHandler extends NewsBaseHandler<ItemViewModelInput> {
  async handle(data: NewsAppData) {
    const viewData = await new ItemViewModelBuilder(this.input, data).build();

    if (viewData.event && viewData.event.source.id === viewData.item.id) {
      const url = viewData.links.news.story(
        viewData.event.slug,
        viewData.event.id,
        { ul: viewData.lang }
      );

      this.setCacheControl(60 * 12);

      return this.redirect(url, 301);
    } else {
      const url = `http://${viewData.item.urlHost}${viewData.item.urlPath}`;

      this.setCacheControl(60 * 24 * 30);

      return this.redirect(url, 301);
    }
  }
}
