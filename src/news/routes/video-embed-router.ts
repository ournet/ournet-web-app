import { Request, Response } from "../../base/types";
import { NewsBaseRouter, NewsBaseRouterData } from "../router";
import { VideoEmbedViewModelInput } from "../view-models/video-embed-view-model";
import { VideoEmbedHandler } from "../handlers/video-embed-handler";

interface VideoEmbedRouterData extends NewsBaseRouterData {
    id: string
}

export class VideoEmbedRouter extends NewsBaseRouter<VideoEmbedRouterData> {
    constructor() {
        super('/video_embed/([^/]+)', ['id'])
    }

    protected createHander(req: Request, res: Response, data: VideoEmbedRouterData) {
        const input = this.formatInput<VideoEmbedViewModelInput>(req, res);
        input.id = data.id;
        return new VideoEmbedHandler(input);
    }
}
