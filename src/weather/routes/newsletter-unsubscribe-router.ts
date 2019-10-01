import { OurnetRouter } from "../../ournet/router";
import { WeatherBaseRouterData } from "../router";
import { Response, Request } from "../../base/types";
import { createAppConfig } from "../../ournet/config";
import { sitemap } from "ournet.links";
import { getLanguageFromQueryString } from "../../ournet/view-model";
import {
  RedirectHandler,
  RedirectHandlerInput
} from "../../base/redirect-handler";
import { AppData } from "../../base/app-data";
import { createOurnetAppData, OurnetProjectName } from "../../ournet/data";
import logger from "../../logger";

interface RouterData extends WeatherBaseRouterData {
  id: string;
}

interface NewsletterUnsubscribeInput extends RedirectHandlerInput {
  id: string;
}

class NewsletterUnsubscribeHadler extends RedirectHandler<
  AppData,
  NewsletterUnsubscribeInput
> {
  async handle(data: AppData) {
    const appData = createOurnetAppData(OurnetProjectName.WEATHER);
    const client = appData.createQueryApiClient<{ unsubscribe: boolean }>();
    client.cocoshelUnsubsribe<{ unsubscribe: boolean }>("unsubscribe", {
      id: this.input.id
    });
    try {
      const result = await appData.executeApiClient<{ unsubscribe: boolean }>(
        client
      );
      logger.warn(
        `unsubscribe ${result.unsubscribe} id=${this.input.id}`,
        this.input
      );
    } catch (e) {
      logger.error(e);
    }
    return super.handle(data);
  }
}

export class NewsletterUnsubscribeRouter extends OurnetRouter<RouterData> {
  constructor() {
    super(`/newsletter/unsubscribe/([\\w\\d]+)`, ["id"]);
  }
  protected createHander(req: Request, res: Response, data: RouterData) {
    const input = this.formatInput(req, res);
    const config = createAppConfig(input.project, input.country);
    const links = sitemap(config.languages[0]);
    const lang = getLanguageFromQueryString(config, input.url.query);

    const handler = new NewsletterUnsubscribeHadler({
      id: data.id,
      code: 301,
      location: links.weather.home({ ul: lang }),
      req,
      res
    });

    handler.setCacheControl(60 * 24);

    return handler;
  }
}
