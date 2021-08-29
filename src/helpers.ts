import { Place, NewsEvent } from "@ournet/api-client";
import { PlaceHelper } from "@ournet/places-domain";
import { Sitemap, getHost, getSchema } from "ournet.links";
import { ImageStorageHelper } from "@ournet/images-domain";
import { OurnetProjectName } from "./ournet/data";
const standard = require("standard-text");
const ellipsize = require("ellipsize");
const entipicUrlFn = require("entipic.url").create("//cdn.entipic.com");

export function entipicUrl(
  name: string,
  size?: "a" | "b" | "c" | "d" | "e" | "f" | string,
  lang?: string,
  country?: string
): string {
  return entipicUrlFn(name, size, lang, country);
}

export function truncateAt(text: string, maxLength: number): string {
  return ellipsize(text, maxLength, { truncate: false });
}

const fixPlaceName = (name: string, lang: string) => {
  if (lang === "vi" && /^Thành phố/i.test(name)) {
    return name.substr(9).trim();
  }
  return name;
};

export function getPlaceName(place: Place, lang: string): string {
  const key = "_name_" + lang;
  const anyPlace = place as any;
  if (anyPlace[key]) {
    return anyPlace[key];
  }
  const name = place.names
    ? PlaceHelper.parseNames(place.names || "").find(
        (item) => item.lang === lang
      )
    : null;
  if (name && name.name) {
    return (anyPlace[key] = standard(fixPlaceName(name.name, lang), lang));
  }
  return (anyPlace[key] = standard(fixPlaceName(place.name, lang), lang));
}

export function getImageColorFromId(imageId: string) {
  return imageId.split(/-/g)[1];
}

export function startWithUpperCase(text: string) {
  if (text) {
    text = text[0].toUpperCase() + text.substr(1);
  }
  return text;
}

export function getAppIconUrl(domain: string, filename: string) {
  var name = domain.split(".")[0];
  name = ["click", "zborg", "diez"].indexOf(name) > -1 ? name : "ournet";

  return (
    "https://assets.ournetcdn.net/ournet/img/icons/" + name + "/" + filename
  );
}

export function createStoryFeedItem(
  links: Sitemap,
  story: NewsEvent,
  lang: string,
  schema: string,
  host: string
) {
  const url =
    schema +
    "//" +
    host +
    links.news.story(story.slug, story.id, {
      ul: lang,
      utm_source: "rss",
      utm_medium: "link",
      utm_campaign: "rss"
    });

  const item = {
    title: story.title,
    description: truncateAt(story.summary, 250),
    url: url,
    guid: "event-" + story.id,
    date: story.createdAt,
    enclosure: {
      url: ImageStorageHelper.eventUrl(story.imageId, "large")
    }
  };

  return item;
}

export function toBeaufort(ms: number) {
  if (ms <= 0.2) {
    return 0;
  }
  if (ms <= 1.5) {
    return 1;
  }
  if (ms <= 3.3) {
    return 2;
  }
  if (ms <= 5.4) {
    return 3;
  }
  if (ms <= 7.9) {
    return 4;
  }
  if (ms <= 10.7) {
    return 5;
  }
  if (ms <= 13.8) {
    return 6;
  }
  if (ms <= 17.1) {
    return 7;
  }
  if (ms <= 20.7) {
    return 8;
  }
  if (ms <= 24.4) {
    return 9;
  }
  if (ms <= 28.4) {
    return 10;
  }
  if (ms <= 32.6) {
    return 11;
  }
  return 12;
}

export function unixTime(date?: Date) {
  date = date || new Date();

  return Math.floor(date.getTime() / 1000);
}

export function isNullOrEmpty(val?: string) {
  return [null, undefined, ""].includes(val);
}

export function encodeHTML(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function resolveProjectLinkPrefix(
  currentProject: OurnetProjectName,
  linkProject: OurnetProjectName,
  country: string
) {
  if (currentProject === linkProject) {
    return "";
  }
  const host = getHost(linkProject, country);

  if (!host) {
    return "";
  }

  const schema = getSchema(linkProject, country);

  return schema + "//" + host;
}
