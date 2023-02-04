import { Request, Response } from "../../base/types";
import { NewsBaseRouter, NewsBaseRouterData } from "../router";
import { SourceHandler } from "../handlers/source-handler";
import { SourceViewModelInput } from "../view-models/source-view-model";

interface SourceRouterData extends NewsBaseRouterData {
  slug: string;
}

export class SourceRouter extends NewsBaseRouter<SourceRouterData> {
  constructor() {
    super("/source/([^/]+)", ["slug"]);
  }

  protected createHander(req: Request, res: Response, data: SourceRouterData) {
    const input = this.formatInput<SourceViewModelInput>(req, res);
    input.slug = data.slug;
    return new SourceHandler(input);
  }
}
