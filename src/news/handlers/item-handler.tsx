
import * as React from 'react';
import { NewsBaseHandler } from "./handler";
import { NewsAppData } from "../data";
import ItemPage from '../views/item/item-page';
import { ItemViewModelBuilder, ItemViewModelInput } from '../view-models/item-view-model';

export class ItemHandler extends NewsBaseHandler<ItemViewModelInput>{
    async handle(data: NewsAppData) {
        const viewData = await new ItemViewModelBuilder(this.input, data).build();

        this.setCacheControl(30);

        if (viewData.event && viewData.event.source.id === viewData.item.id) {

            const url = viewData.links.news.story(viewData.event.slug, viewData.event.id, { ul: viewData.lang });

            this.setCacheControl(60 * 12);

            return this.redirect(url, 301);
        }

        return this.render(<ItemPage {...viewData} />);
    }
}
