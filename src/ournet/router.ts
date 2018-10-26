import { Router } from "../base/router";
import { OurnetViewModelInput } from "./view-model";
import { Request, Response } from "../base/types";
import { getHostInfo } from "../hosts";

export abstract class OurnetRouter<DATA=void> extends Router<DATA> {
    formatInput<INPUT extends OurnetViewModelInput>(req: Request, res: Response) {
        const url = this.parseUrl(req);
        const host = url.hostname || '';
        const hostInfo = getHostInfo(host);

        const input: OurnetViewModelInput = { req, res, host, url, country: hostInfo.country };

        return input as INPUT;
    }
}
