import { Request, Response } from "../../base/types";
import { NewsBaseRouter } from "../router";
import { ImportantHandler } from "../handlers/important-handler";

export class ImportantRouter extends NewsBaseRouter {
    constructor() {
        super('/important')
    }

    protected createHander(req: Request, res: Response) {
        return new ImportantHandler(this.formatInput(req, res));
    }
}
