import { WeatherBaseRouter } from "../router";
import { Request, Response } from "../../base/types";
import { DataHandler } from "../../base/data-handler";
import { OurnetProjectName } from "../../ournet/data";
import { sitemap, getSchema, getHost } from "ournet.links";

export class RobotsRouter extends WeatherBaseRouter {
  constructor() {
    super("/robots.txt");
  }
  protected createHander(req: Request, res: Response) {
    const { country, project } = this.formatInput(req, res);
    const config = this.createAppConfig(OurnetProjectName.WEATHER, country);
    const links = sitemap(config.languages[0]);
    const sitemapUrl = (ul: string) =>
      `Sitemap: ${getSchema(project, country)}${getHost(
        project,
        country
      )}${links.weather.sitemap.regionIndex({ ul })}`;
    const handler = new DataHandler({
      req,
      res,
      data: `User-agent: *
Disallow: /controls
Disallow: /actions
Disallow: /widget/widget_frame
Disallow: /widget2/widget_frame
Disallow: /widget/widgetframe
Disallow: /widget2/widgetframe

${config.languages.map(lang => sitemapUrl(lang)).join("\n")}
`,
      code: 200,
      headers: { "Content-Type": "text/plain; charset=UTF-8" }
    });

    handler.setCacheControl(60 * 24);

    return handler;
  }
}

export class OneSignalSDKWorkerRouter extends WeatherBaseRouter {
  constructor() {
    super("/OneSignalSDKWorker.js");
  }
  protected createHander(req: Request, res: Response) {
    const handler = oneSignalHandler(req, res);

    handler.setCacheControl(60 * 24);

    return handler;
  }
}

export class OneSignalSDKUpdaterWorkerRouter extends WeatherBaseRouter {
  constructor() {
    super("/OneSignalSDKUpdaterWorker.js");
  }
  protected createHander(req: Request, res: Response) {
    const handler = oneSignalHandler(req, res);

    handler.setCacheControl(60 * 24);

    return handler;
  }
}

const oneSignalHandler = (req: Request, res: Response) =>
  new DataHandler({
    req,
    res,
    data: `importScripts('https://cdn.onesignal.com/sdks/OneSignalSDK.js');`,
    code: 200,
    headers: { "Content-Type": "application/javascript; charset=UTF-8" }
  });
