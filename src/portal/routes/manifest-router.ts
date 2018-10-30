import { PortalBaseRouter } from "../router";
import { Request, Response } from "../../base/types";
import { PortalBaseHandler } from "../handlers/handler";
import { IPortalAppData } from "../data";
import { PortalViewModelBuilder } from "../view-models/portal-view-model";
import { PortalLocaleNames } from "../locale";
import { getAppIconUrl } from "../../helpers";

export class ManifestRouter extends PortalBaseRouter {
    constructor() {
        super('/manifest.json');
    }
    protected createHander(req: Request, res: Response) {
        return new ManifestHandler(this.formatInput(req, res));
    }
}

class ManifestHandler extends PortalBaseHandler {
    async handle(appData: IPortalAppData) {

        const model = await new PortalViewModelBuilder(this.input, appData).build();
        const { translate, config } = model;

        const manifest = {
            name: translate(PortalLocaleNames.app_name),
            short_name: translate(PortalLocaleNames.short_app_name),
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

        const res = this.input.res;

        this.setCacheControl(res, 60 * 24 * 30);

        return this.send(res, manifest, 200);
    }
}
