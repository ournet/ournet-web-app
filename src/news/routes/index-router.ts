import { Request, Response } from "../../base/types";
import { NewsBaseRouter } from "./router";
import { RegExpRoutePattern } from "../../base/router";
import { IndexHandler } from "../handlers/index-handler";

export class IndexRouter extends NewsBaseRouter {
    constructor() {
        super(new RegExpRoutePattern(NewsBaseRouter.formatRouteRegExp('/')))
    }

    protected createHander(req: Request, res: Response) {
        return new IndexHandler(this.formatInput(req, res));
    }
}
