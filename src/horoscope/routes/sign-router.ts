import { Request, Response } from "../../base/types";
import { HoroscopeBaseRouter, HoroscopeBaseRouterData } from "../router";
import { SignHandler } from "../handlers/sign-handler";
import { SignViewModelInput } from "../view-models/sign-view-model";

interface SignRouterData extends HoroscopeBaseRouterData {
    slug: string
}

export class SignRouter extends HoroscopeBaseRouter<SignRouterData> {
    constructor() {
        super('/([a-z-]+)', ['slug'])
    }

    protected createHander(req: Request, res: Response, data: SignRouterData) {
        const input = this.formatInput<SignViewModelInput>(req, res);
        input.slug = data.slug;
        return new SignHandler(input);
    }
}
