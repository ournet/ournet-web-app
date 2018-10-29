
import { NewsBaseHandler } from "./handler";
import { INewsAppData } from "../data";
import { EventViewModelInput } from '../view-models/event-view-model';

export class ViewEventHandler extends NewsBaseHandler<EventViewModelInput>{
    async handle(data: INewsAppData) {
        const apiClient = data.createMutationApiClient<{ countViews: number }>()
        apiClient.newsViewNewsEvent('countViews', { id: this.input.id });

        await apiClient.execute();

        return this.sendPixel();
    }

    sendPixel() {
        const img = new Buffer('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
        this.input.res.setHeader('Content-Type', 'image/gif');
        this.input.res.setHeader('Content-Length', img.length.toString());
        this.send(this.input.res, img);
    }
}
