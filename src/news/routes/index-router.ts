import { Request, Response } from "../../base/types";
import { NewsBaseRouter } from "../router";
import { IndexHandler } from "../handlers/index-handler";

export class IndexRouter extends NewsBaseRouter {
    constructor() {
        super('/')
    }

    protected createHander(req: Request, res: Response) {
        return new IndexHandler(this.formatInput(req, res));
    }
}
