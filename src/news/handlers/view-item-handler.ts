
import { NewsBaseHandler } from "./handler";
import { INewsAppData } from "../data";
import { ItemViewModelInput } from "../view-models/item-view-model";

export class ViewItemHandler extends NewsBaseHandler<ItemViewModelInput>{
    async handle(data: INewsAppData) {
        const apiClient = data.createMutationApiClient<{ countViews: number }>()
        apiClient.newsViewNewsItem('countViews', { id: this.input.id });

        await apiClient.execute();

        const res = this.input.res;

        this.setCacheControl(res, 0);

        return this.sendPixel();
    }

    sendPixel() {
        const img = new Buffer('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
        this.send(this.input.res, img, 200, { 'Content-Type': 'image/gif', 'Content-Length': img.length.toString() });
    }
}