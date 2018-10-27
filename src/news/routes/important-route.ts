import { Request, Response } from "../../base/types";
import { NewsBaseRouter } from "../router";
import { RegExpRoutePattern } from "../../base/router";
import { ImportantHandler } from "../handlers/important-handler";

export class ImportantRouter extends NewsBaseRouter {
    constructor() {
        super(new RegExpRoutePattern(NewsBaseRouter.formatRouteRegExp('/important')))
    }

    protected createHander(req: Request, res: Response) {
        return new ImportantHandler(this.formatInput(req, res));
    }
}
