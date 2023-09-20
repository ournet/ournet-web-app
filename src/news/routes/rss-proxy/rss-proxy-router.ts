import { NewsBaseRouter, NewsBaseRouterData } from "../../router";
import { Request, Response } from "../../../base/types";
import { NewsAppData } from "../../data";
import {
  OurnetViewModel,
  OurnetViewModelInput
} from "../../../ournet/view-model";
import { notFound } from "boom";
import { Handler } from "../../../base/handler";
import { NewsAppConfig } from "../../config";
import { AsyncViewModelBuilder } from "../../../ournet/async-view-model";
import * as protvmd from "./protv_md";
import * as tv8md from "./tv8_md";
import * as agerpresro from "./agerpres_ro";
import * as jurnalmd from "./jurnal_md_ru";

interface RssProxyRouterData extends NewsBaseRouterData {
  id: string;
}

interface RssProxyViewModelInput extends OurnetViewModelInput {
  id: string;
}

export class RssProxyRouter extends NewsBaseRouter<RssProxyRouterData> {
  constructor() {
    super("/rss-proxy/([a-z0-9_.-]+).xml", ["id"]);
  }

  protected createHander(
    req: Request,
    res: Response,
    data: RssProxyRouterData
  ) {
    const input = this.formatInput<RssProxyViewModelInput>(req, res);
    input.id = data.id;
    return new RssHandler(input);
  }
}

class RssHandler extends Handler<NewsAppData, RssProxyViewModelInput> {
  async handle(data: NewsAppData) {
    const viewData = await new RssTopicViewModelBuilder(
      this.input,
      data
    ).build();
    const { feed } = viewData;

    if (!feed) {
      throw notFound(`Not found feed =${this.input.id}`);
    }

    this.setCacheControl(30);

    return this.send(feed.xml(), 200, {
      "Content-Type": "application/rss+xml; charset=utf-8"
    });
  }
}

interface RssProxyViewModel extends OurnetViewModel<NewsAppConfig> {
  feed: any;
}

class RssTopicViewModelBuilder extends AsyncViewModelBuilder<
  NewsAppData,
  NewsAppConfig,
  RssProxyViewModel,
  RssProxyViewModelInput
> {
  async build() {
    switch (this.input.id) {
      case "protv.md":
        this.model.feed = await protvmd.getRss();
        break;
      case "tv8.md":
        this.model.feed = await tv8md.getRss();
        break;
      case "tv8.md-ru":
        this.model.feed = await tv8md.getRss("ru");
        break;
      case "agerpres.ro":
        this.model.feed = await agerpresro.getRss();
        break;
      case "jurnal.md-ru":
        this.model.feed = await jurnalmd.getRss();
        break;
    }
    return super.build();
  }
}
