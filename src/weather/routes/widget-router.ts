import { Request, Response } from "../../base/types";
import { WeatherBaseRouter } from "../router";
import { WidgetHandler, Widget1FrameHandler, Widget1HtmlStriptHandler, Widget2FrameHandler, Widget2HtmlStriptHandler } from "../handlers/widget-handler";
import { Widget1ViewModelInput } from "../view-models/widget1-view-model";
import { Dictionary } from "@ournet/domain";
import { Widget2ViewModelInput } from "../view-models/widget2-view-model";


export class WidgetRouter extends WeatherBaseRouter {
    constructor() {
        super(`/widget`)
    }

    protected createHander(req: Request, res: Response) {
        const input = this.formatInput(req, res);
        return new WidgetHandler(input);
    }
}

export class Widget1FrameRouter extends WeatherBaseRouter {
    constructor() {
        super(`/widget/widget_frame`)
    }

    protected createHander(req: Request, res: Response) {
        let input = this.formatInput<Widget1ViewModelInput>(req, res);
        const query = input.url.query as Dictionary<string>;

        input = {
            ...input, ...{
                bkcolor: query.bkcolor,
                days: parseInt(query.days),
                htcolor: query.htcolor,
                id: query.id,
                hbkcolor: query.hbkcolor,
                bcolor: query.bcolor,
                lcolor: query.lcolor,
                textcolor: query.textcolor,
                w: parseInt(query.w)
            }
        }

        return new Widget1FrameHandler(input);
    }
}

export class Widget1HtmlScriptRouter extends WeatherBaseRouter {
    constructor() {
        super(`/widget/widget_html_script`)
    }

    protected createHander(req: Request, res: Response) {
        let input = this.formatInput<Widget1ViewModelInput>(req, res);
        const query = input.url.query as Dictionary<string>;

        input = {
            ...input, ...{
                bkcolor: query.bkcolor,
                days: parseInt(query.days),
                htcolor: query.htcolor,
                id: query.id,
                hbkcolor: query.hbkcolor,
                bcolor: query.bcolor,
                lcolor: query.lcolor,
                textcolor: query.textcolor,
                w: parseInt(query.w)
            }
        }

        return new Widget1HtmlStriptHandler(input);
    }
}

export class Widget2FrameRouter extends WeatherBaseRouter {
    constructor() {
        super(`/widget2/widget_frame`)
    }

    protected createHander(req: Request, res: Response) {
        let input = this.formatInput<Widget2ViewModelInput>(req, res);
        const query = input.url.query as Dictionary<string>;

        input = {
            ...input, ...{
                color: query.color || '68a7d4',
                days: parseInt(query.days),
                w: parseInt(query.w),
                header: ['true', 'on', 'True', '1'].includes(query.header),
                id: query.id,
                itemcolor: query.itemcolor,
                pos: query.pos as 'h' | 'v' || 'v',
                textcolor: query.textcolor,
            }
        }

        return new Widget2FrameHandler(input);
    }
}

export class Widget2HtmlScriptRouter extends WeatherBaseRouter {
    constructor() {
        super(`/widget2/widget_html_script`)
    }

    protected createHander(req: Request, res: Response) {
        let input = this.formatInput<Widget2ViewModelInput>(req, res);
        const query = input.url.query as Dictionary<string>;

        input = {
            ...input, ...{
                color: query.color || '68a7d4',
                days: parseInt(query.days),
                w: parseInt(query.w),
                header: ['true', 'on', 'True', '1'].includes(query.header),
                id: query.id,
                itemcolor: query.itemcolor,
                pos: query.pos as 'h' | 'v' || 'v',
                textcolor: query.textcolor,
            }
        }

        return new Widget2HtmlStriptHandler(input);
    }
}
