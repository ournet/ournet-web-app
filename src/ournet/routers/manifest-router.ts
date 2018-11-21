import { Request, Response } from "../../base/types";
import { getAppIconUrl } from "../../helpers";
import { Handler } from "../../base/handler";
import { OurnetViewModelBuilder, OurnetViewModelInput } from "../view-model";
import { OurnetAppData } from "../data";
import { OurnetRouter } from "../router";

export class ManifestRouter extends OurnetRouter {
    constructor() {
        super('/manifest.json');
    }
    protected createHander(req: Request, res: Response) {
        return new ManifestHandler(this.formatInput(req, res));
    }
}

class ManifestHandler<DATA extends OurnetAppData, INPUT extends OurnetViewModelInput> extends Handler<DATA, INPUT> {
    async handle(appData: DATA) {

        const model = await new OurnetViewModelBuilder(this.input, appData).build();
        const { locales, config, project, country } = model;

        const manifest = {
            name: locales.getAppName(project, country),
            short_name: locales.getShortAppName(project, country),
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
