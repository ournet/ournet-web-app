import { NewsBaseHandler } from "./handler";
import { NewsAppData } from "../data";
import { EventViewModelInput } from "../view-models/event-view-model";

export class ViewEventHandler extends NewsBaseHandler<EventViewModelInput> {
  async handle(data: NewsAppData) {
    const apiClient = data.createMutationApiClient<{ countViews: number }>();
    apiClient.newsViewNewsEvent("countViews", { id: this.input.id });

    await apiClient.queryExecute();

    this.setCacheControl(0);

    return this.sendPixel();
  }

  sendPixel() {
    const img = Buffer.from(
      "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
      "base64"
    );
    this.send(img, 200, {
      "Content-Type": "image/gif",
      "Content-Length": img.length.toString()
    });
  }
}
