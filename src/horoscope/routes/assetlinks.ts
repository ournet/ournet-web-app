
import { Request, Response } from "../../base/types";
import { DataHandler, DataHandlerInput } from "../../base/data-handler";
import { OurnetRouter } from "../../ournet/router";
import ms = require("ms");

export class AssetlinksRouter extends OurnetRouter {
    constructor() {
        super('/.well-known/assetlinks.json');
    }
    protected createHander(req: Request, res: Response) {
        const dataInput: DataHandlerInput = {
            code: 200,
            req,
            res,
            data: [{
                "relation": ["delegate_permission/common.handle_all_urls"],
                "target": {
                    "namespace": "android_app", "package_name": "com.ournet.horoscope",
                    "sha256_cert_fingerprints": ["63:69:E2:8C:C4:5E:BE:EB:BE:98:3E:CB:FE:C6:D5:CC:8D:69:A8:E4:36:D9:B3:9E:16:AD:E8:9B:17:35:46:76"]
                }
            }],
            headers: {
                'content-type': 'application/json',
            },
        };

        const handler = new DataHandler(dataInput);

        handler.setCacheControl(ms('7d'));

        return handler;
    }
}
