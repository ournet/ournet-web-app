
import { WeatherBaseHandler } from "./handler";
import { WeatherAppData } from "../data";
import { WidgetViewModelBuilder } from "../view-models/widget-view-model";
import { WidgetPage } from "../views/widget/widget";
import { Widget1ViewModelInput, Widget1ViewModelBuilder } from "../view-models/widget1-view-model";
import { Widget1Frame } from "../views/widget/widget1-frame";
import { getHost } from "ournet.links";
import { isNullOrEmpty } from "../../helpers";
import { Dictionary } from "@ournet/domain";
import { Widget2ViewModelInput, Widget2ViewModelBuilder } from "../view-models/widget2-view-model";
import { Widget2Frame } from "../views/widget/widget2-frame";

export class WidgetHandler extends WeatherBaseHandler {
    async handle(data: WeatherAppData) {
        const viewData = await new WidgetViewModelBuilder(this.input, data).build();

        this.setCacheControl(60 * 12);
        return this.render(WidgetPage(viewData));
    }
}

export class Widget1FrameHandler extends WeatherBaseHandler<Widget1ViewModelInput> {
    async handle(data: WeatherAppData) {
        const viewData = await new Widget1ViewModelBuilder(this.input, data).build();

        this.setCacheControl(60 * 2);
        return this.render(Widget1Frame(viewData));
    }
}

export class Widget1HtmlStriptHandler extends WeatherBaseHandler<Widget1ViewModelInput> {
    async handle(appData: WeatherAppData) {
        const model = await new Widget1ViewModelBuilder(this.input, appData).build();

        this.setCacheControl(60 * 3);

        const { config, links, country, project } = model;
        const query = this.input.url.query;

        const days = query.days && parseInt(query.days as string) || 5,
            height = 29 + days * 42 + days - 1,
            width = query.w as string;
        const scripttype = query.scripttype as string || 'iframe';

        delete query.scripttype;

        const data = ['<!-- ' + config.domain + ' Weather Widget -->'];

        const host = getHost(project, country);

        for (let prop in query) {
            if (isNullOrEmpty(query[prop] as string)) {
                delete query[prop];
            }
        }

        if (scripttype === 'iframe') {
            data.push('<iframe src="//' + host + links.weather.widget.widgetFrame(query as Dictionary<string>) + '" scrolling="no" frameborder="0" style="border:none;overflow:hidden;height:' + height + 'px;width:' + width + 'px;" allowTransparency="true"></iframe>');
            data.push('<noscript><a href="http://' + host + '">' + config.domain + '</a></noscript>');
        } else {

            let params = [];
            for (var prop in query) {
                if (![null, '', undefined].includes(query[prop] as string)) {
                    params.push(prop + '=' + query[prop]);
                }
            }
            data.push('<ins class="ournetweather" style="display:block;max-width:' + width + 'px;height:' + height + 'px" data-type="widget" data-cn="' + country + '" data-params="' + params.join(';') + '" data-h="' + height + '"></ins>');
            data.push('<noscript><a href="http://' + host + '">' + config.domain + '</a></noscript>');
            data.push('<script>(ournetweather=window.ournetweather||[]).push({})</script>');
            data.push('<script async src="//d1mm9th3p1o4yr.cloudfront.net/ournet/js/weather/widget-ins.js"></script>');
        }

        this.send(data.join('\n'), 200);
    }
}

export class Widget2FrameHandler extends WeatherBaseHandler<Widget2ViewModelInput> {
    async handle(data: WeatherAppData) {
        const viewData = await new Widget2ViewModelBuilder(this.input, data).build();

        this.setCacheControl(60 * 2);
        return this.render(Widget2Frame(viewData));
    }
}

export class Widget2HtmlStriptHandler extends WeatherBaseHandler<Widget2ViewModelInput> {
    async handle(appData: WeatherAppData) {
        const model = await new Widget2ViewModelBuilder(this.input, appData).build();

        this.setCacheControl(60 * 3);

        const { config, links, country, project } = model;
        const query = this.input.url.query as Dictionary<string>;

        const scripttype = query.scripttype || 'iframe';

        delete query.cn;
        delete query.scripttype;

        let script = '';
        const host = getHost(project, country);

        for (let prop in query) {
            if (isNullOrEmpty(query[prop])) {
                delete query[prop];
            }
        }

        const widgetInfo = Widget2ViewModelBuilder.createWidgetInfo(this.input);
        const iframeHeight = widgetInfo.iframeHeight;

        if (scripttype === 'iframe') {
            const data = ['<!-- ' + config.domain + ' Weather Widget -->'];
            data.push('<iframe src="//' + host, links.weather.widget2.widgetFrame(query) + '" scrolling="no" frameborder="0" style="border:none;overflow:hidden;height:' + iframeHeight + 'px;width:' + query.w + 'px;" allowTransparency="true"></iframe>');
            data.push('<noscript><a href="http://' + host + '">' + config.domain + '</a></noscript>');
            script = data.join('\n');
        } else {
            const params = [];
            for (var prop in query) {
                if (![null, '', undefined].includes(query[prop])) {
                    params.push(prop + '=' + query[prop]);
                }
            }

            script = ['<!-- ' + config.domain + ' Weather Widget -->',
            '<ins class="ournetweather" style="display:block;max-width:' + query.w + 'px;height:' + iframeHeight + 'px" data-cn="' + country + '" data-params="' + params.join(';') + '" data-h="' + iframeHeight + '"></ins>',
            '<noscript><a href="http://' + host + '">' + config.domain + '</a></noscript>',
                '<script>(ournetweather=window.ournetweather||[]).push({})</script>',
                '<script async src="//d1mm9th3p1o4yr.cloudfront.net/ournet/js/weather/widget-ins.js"></script>'
            ].join('\n');
        }
        this.send(script, 200);
    }
}
