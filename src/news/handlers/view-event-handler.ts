
import { NewsBaseHandler } from "./handler";
import { INewsAppData } from "../data";
import { EventViewModelInput } from '../view-models/event-view-model';

export class ViewEventHandler extends NewsBaseHandler<EventViewModelInput>{
    async handle(data: INewsAppData) {
        const apiClient = data.createMutationApiClient<{ countViews: number }>()
        apiClient.newsViewNewsEvent('countViews', { id: this.input.id });

        await apiClient.execute();

        this.setCacheControl(0);

        return this.sendPixel();
    }

    sendPixel() {
        const img = new Buffer('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
        this.send(img, 200, { 'Content-Type': 'image/gif', 'Content-Length': img.length.toString() });
    }
}
