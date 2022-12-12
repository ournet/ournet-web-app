import { WeatherViewModelBuilder } from "./weather-view-model";
import { OurnetViewModelInput } from "../../ournet/view-model";
import { IndexViewModel } from "./index-view-model";
import { badImplementation } from "boom";

export class ListViewModelBuilder extends WeatherViewModelBuilder<
  IndexViewModel,
  ListViewModelInput
> {
  build() {
    const { lang, links, config } = this.model;

    if (!config.lists) {
      throw badImplementation(`Config doesn't contain lists`);
    }
    const list = config.lists.find((list) => list.id === this.input.listId);
    if (!list) {
      throw badImplementation(
        `Config doesn't contain list ${this.input.listId}`
      );
    }
    const model = this.model;

    model.placeIds = list.ids;
    model.head.title = list.title[lang];
    model.head.description = list.description[lang];

    this.setCanonical(links.weather.place(list.id, { ul: lang }));

    return super.build();
  }
}

export interface ListViewModelInput extends OurnetViewModelInput {
  listId: string;
}
