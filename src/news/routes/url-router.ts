import { NewsBaseRouter } from "../router";
import { Request, Response } from "../../base/types";
import { NewsBaseHandler } from "../handlers/handler";

export class UrlRouter extends NewsBaseRouter {
    constructor() {
        super('/url');
    }
    protected createHander(req: Request, res: Response) {
        return new UrlHandler(this.formatInput(req, res));
    }
}

class UrlHandler extends NewsBaseHandler {
    handle() {
        let url = this.input.url.query.url as string;

        if (!url) {
            throw new Error(`'url' query param is required!`);
        }

        if (!url.startsWith('http')) {
            url = 'http://' + url;
        }

        this.setCacheControl(60 * 24 * 30);

        return this.redirect(url, 301);
    }
}
