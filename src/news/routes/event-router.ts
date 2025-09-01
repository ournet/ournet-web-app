import { Request, Response } from "../../base/types";
import { NewsBaseRouter, NewsBaseRouterData } from "../router";
import { EventHandler } from "../handlers/event-handler";
import { EventViewModelInput } from "../view-models/event-view-model";
import { shouldHideStory } from "../hide-story-ids";
import { RedirectHandler } from "../../base/redirect-handler";
import { getLocaleFromStoryId } from "../helpers";

interface EventRouterData extends NewsBaseRouterData {
  id: string;
}

export class EventRouter extends NewsBaseRouter<EventRouterData> {
  constructor() {
    super("/story/[^/]+-([^/]+)", ["id"]);
  }

  protected createHander(req: Request, res: Response, data: EventRouterData) {
    const input = this.formatInput<EventViewModelInput>(req, res);
    input.id = data.id;
    if (shouldHideStory(data.id))
      return new RedirectHandler({
        location: "/?error=deleted",
        code: 301,
        req,
        res
      });
    const { lang, country } = getLocaleFromStoryId(data.id);
    const config = this.createAppConfig(input.project, input.country);
    if (input.country !== country || !config.languages.includes(lang)) {
      return new RedirectHandler({
        location: `/?error=not_found`,
        code: 301,
        req,
        res
      });
    }

    return new EventHandler(input);
  }
}
