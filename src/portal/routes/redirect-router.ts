import { Request, Response } from "../../base/types";
import { RedirectHandler } from "../../base/redirect-handler";
import { OurnetRouter } from "../../ournet/router";
import { getSchema, getHost } from "ournet.links";
import { OurnetProjectName } from "../../ournet/data";


const ROUTE_PREFIX = '(prognoza|pogoda|vremea|forecast|tempo|pocasi|elorejelzes|mot)';

export class PrefixOldWidgetRedirectRouter extends OurnetRouter {
    constructor() {
        super(`/${ROUTE_PREFIX}/widget/widgetframe`)
    }
    protected createHander(req: Request, res: Response) {
        const input = this.formatInput(req, res);
        const { country } = input;

        const handler = new RedirectHandler({
            code: 301,
            location: getSchema(OurnetProjectName.WEATHER, country) + '//' + getHost(OurnetProjectName.WEATHER, country) + input.url.path,
            req,
            res,
        });

        handler.setCacheControl(60 * 24);

        return handler;
    }
}

