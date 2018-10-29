
import * as React from 'react';
import { NewsBaseHandler } from "./handler";
import { INewsAppData } from "../data";
import ItemPage from '../views/item/item-page';
import { ItemViewModelBuilder, ItemViewModelInput } from '../view-models/item-view-model';

export class ItemHandler extends NewsBaseHandler<ItemViewModelInput>{
    async handle(data: INewsAppData) {
        const viewData = await new ItemViewModelBuilder(this.input, data).build();
        const res = this.input.res;

        this.setCacheControl(res, 30);

        if (viewData.event && viewData.event.source.id === viewData.item.id) {

            const url = viewData.links.news.story(viewData.event.slug, viewData.event.id, { ul: viewData.lang });

            this.setCacheControl(res, 60 * 12);

            return this.redirect(res, url, 301);
        }

        return this.render(res, <ItemPage {...viewData} />);
    }
}
