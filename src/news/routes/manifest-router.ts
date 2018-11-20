import { NewsBaseRouter } from "../router";
import { Request, Response } from "../../base/types";
import { NewsBaseHandler } from "../handlers/handler";
import { INewsAppData } from "../data";
import { NewsViewModelBuilder } from "../view-models/news-view-model";
import { getAppIconUrl } from "../../helpers";

export class ManifestRouter extends NewsBaseRouter {
    constructor() {
        super('/manifest.json');
    }
    protected createHander(req: Request, res: Response) {
        return new ManifestHandler(this.formatInput(req, res));
    }
}

class ManifestHandler extends NewsBaseHandler {
    async handle(appData: INewsAppData) {

        const model = await new NewsViewModelBuilder(this.input, appData).build();
        const { locales, config } = model;

        const manifest = {
            name: locales.news_app_name(),
            short_name: locales.news_short_app_name(),
            display: 'standalone',
            gcm_sender_id: '482941778795',
            background_color: config.background_color,
            theme_color: config.theme_color,
            icons: [
                {
                    src: getAppIconUrl(config.domain, 'icon-57x57.png'),
                    sizes: "57x57",
                    type: "image/png"
                },
                {
                    src: getAppIconUrl(config.domain, 'icon-72x72.png'),
                    sizes: "72x72",
                    type: "image/png"
                },
                {
                    src: getAppIconUrl(config.domain, 'icon-76x76.png'),
                    sizes: "76x76",
                    type: "image/png"
                },
                {
                    src: getAppIconUrl(config.domain, 'icon-114x114.png'),
                    sizes: "114x114",
                    type: "image/png"
                },
                {
                    src: getAppIconUrl(config.domain, 'icon-120x120.png'),
                    sizes: "120x120",
                    type: "image/png"
                },
                {
                    src: getAppIconUrl(config.domain, 'icon-144x144.png'),
                    sizes: "144x144",
                    type: "image/png"
                },
                {
                    src: getAppIconUrl(config.domain, 'icon-152x152.png'),
                    sizes: "152x152",
                    type: "image/png"
                },
                {
                    src: getAppIconUrl(config.domain, 'icon-180x180.png'),
                    sizes: "180x180",
                    type: "image/png"
                },
            ],
        }

        this.setCacheControl(60 * 24 * 30);

        return this.send(manifest, 200);
    }
}
