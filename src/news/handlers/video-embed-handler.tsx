
import * as React from 'react';
import { NewsBaseHandler } from "./handler";
import { NewsAppData } from "../data";
import { VideoEmbedViewModelInput, VideoEmbedModelBuilder } from '../view-models/video-embed-view-model';
import VideoEmbed from '../views/embed/video_embed';

export class VideoEmbedHandler extends NewsBaseHandler<VideoEmbedViewModelInput>{
    async handle(data: NewsAppData) {
        const viewData = await new VideoEmbedModelBuilder(this.input, data).build();

        this.setCacheControl(30);

        if (!viewData.video) {
            this.setCacheControl(0);
        }

        return this.render(<VideoEmbed {...viewData} />);
    }
}
