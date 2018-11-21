
import { NewsBaseHandler } from "./handler";
import { NewsAppData } from "../data";
import { ItemViewModelInput } from "../view-models/item-view-model";

export class ViewItemHandler extends NewsBaseHandler<ItemViewModelInput>{
    async handle(data: NewsAppData) {
        const apiClient = data.createMutationApiClient<{ countViews: number }>()
        apiClient.newsViewNewsItem('countViews', { id: this.input.id });

        await apiClient.execute();

        this.setCacheControl(0);

        return this.sendPixel();
    }

    sendPixel() {
        const img = new Buffer('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
        this.send(img, 200, { 'Content-Type': 'image/gif', 'Content-Length': img.length.toString() });
    }
}
