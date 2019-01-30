
import { Video } from '@ournet/videos-domain';
import { OurnetViewModelInput } from "../../ournet/view-model";
import { NewsAppConfig } from "../config";
import { PageViewModelBuilder, PageViewModel } from "../../ournet/page-view-model";
import { NewsAppData } from "../data";
import { VideoStringFields } from "@ournet/api-client";

export interface VideoEmbedViewModelInput extends OurnetViewModelInput {
    id: string
}

export interface VideoEmbedViewModel extends PageViewModel<NewsAppConfig> {
    video: Video
}

export class VideoEmbedModelBuilder extends PageViewModelBuilder<NewsAppData, NewsAppConfig, VideoEmbedViewModel, VideoEmbedViewModelInput> {

    async build() {

        const { id } = this.input;
        const { links, lang } = this.model;

        this.setCanonical(links.news.videoEmbed(id, { ul: lang }));

        this.apiClient.videosVideoById('video', { fields: VideoStringFields }, { id });

        return super.build();
    }
}
