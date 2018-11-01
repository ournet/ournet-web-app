
import { HoroscopeViewModel, HoroscopeViewModelBuilder } from "./horoscope-view-model";
import { getSchema, getHost } from "ournet.links";
import { Dictionary } from "@ournet/domain";
import { HoroscopeLocaleNames } from "../locale";

export interface ApiViewModel extends HoroscopeViewModel {
    bodyHtml: string
}

export class ApiViewModelBuilder extends HoroscopeViewModelBuilder<ApiViewModel> {
    build() {
        const { links, lang, translate, head, config, project, country, currentDate } = this.model;

        this.setCanonical(links.horoscope.sign('api', { ul: lang }));

        const variables = {
            project: config.domain.substr(0, 1).toUpperCase() + config.domain.substr(1),
            schema: getSchema(project, country),
            host: getHost(project, country),
            currentDate: currentDate.format('YYYYMMDD')
        };

        this.model.title = head.title = translate(HoroscopeLocaleNames.api_title);
        head.title += ' - ' + variables.project;
        this.model.subTitle = head.description = translate(HoroscopeLocaleNames.api_subtitle, { name: variables.project });

        this.model.bodyHtml = replaceVariables(translate(HoroscopeLocaleNames.api_body), variables);

        return super.build();
    }
}

function replaceVariables(text: string, vars: Dictionary<string>) {
    for (const prop in vars) {
        const val = vars[prop];
        text = text.replace(new RegExp('\\$\\{' + prop + '\\}', 'g'), val);
    }

    return text;
}
