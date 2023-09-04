import * as React from "react";
import { Article } from "@ournet/api-client";
import { ImageSizeName } from "@ournet/images-domain";
import moment = require("moment-timezone");
import { truncateAt } from "../../../helpers";
import { Sitemap, getSchema, getHost, toFullUrl } from "ournet.links";
import { OurnetProjectName } from "../../../ournet/data";
import { OurnetLocales } from "../../../locales";
import { EventListItemViewName } from "./event-list-item";
import { cdn } from "ournet.links";

export type ArticleListItemProps = {
  links: Sitemap;
  lang: string;
  country: string;
  timezone: string;
  view: EventListItemViewName;
  item: Article;
  imageSize?: ImageSizeName;
  project?: OurnetProjectName;
  locales: OurnetLocales;
};

const getImageSize = (def: string, imageSize?: ImageSizeName) => {
  if (!imageSize) return def;
  switch (imageSize) {
    case "square":
      return "thumbnail";
    case "medium":
      return "small";
    case "large":
      return "medium";
    default:
      return imageSize;
  }
};

export function ArticleListItem(props: ArticleListItemProps) {
  switch (props.view) {
    case "media-left":
    case "media-right":
      return mediaItemView(props);
    case "card":
    case "card-bare":
    case "card-wide":
      return cardItemView(props);
  }
}

const getPrefix = (country: string, project?: OurnetProjectName) => {
  return project && project !== OurnetProjectName.NEWS
    ? getSchema(OurnetProjectName.NEWS, country) +
        "//" +
        getHost(OurnetProjectName.NEWS, country)
    : "";
};

function mediaItemView({
  item,
  imageSize,
  view,
  links,
  lang,
  country,
  project
}: ArticleListItemProps) {
  const link = links.news.article(item.slug, item.id, { ul: lang });
  const prefix = getPrefix(country, project);

  return (
    <div
      className={
        "c-event-it c-event-it--media o-media o-media--small" +
        (view === "media-right" ? " o-media--reverse" : "")
      }
    >
      <div className="o-media__img">
        <span
          className="c-event-it__img o-lazy"
          data-src={cdn.media.image(item.imageId || "", {
            size: getImageSize("thumbnail", imageSize)
          })}
        ></span>
      </div>
      <div className="c-event-it__info o-media__body">
        <a
          className="c-event-it__title"
          href={prefix + link}
          title={item.title}
        >
          {truncateAt(item.title, 80)}
        </a>
      </div>
    </div>
  );
}

function cardItemView({
  item,
  imageSize,
  view,
  links,
  lang,
  country,
  timezone,
  project,
  locales
}: ArticleListItemProps) {
  const createdAt = moment(item.createdAt).tz(timezone).locale(lang);

  const newsPrefix = getPrefix(country, project);

  return (
    <div
      className={"c-event-it v--card" + (view !== "card" ? " v--" + view : "")}
    >
      <div className="c-event-it__media">
        <div
          className="c-event-it__img o-lazy"
          data-src={cdn.media.image(item.imageId || "", {
            size: getImageSize("small", imageSize)
          })}
        ></div>
      </div>
      <div className="c-event-it__hover"></div>
      <a
        className="c-event-it__doc"
        title={item.title}
        href={newsPrefix + links.news.article(item.slug, item.id, { ul: lang })}
      >
        <div className="c-event-it__inner">
          <h3 className="c-event-it__title">{truncateAt(item.title, 100)}</h3>
        </div>
      </a>
      {view !== "card-bare" && (
        <div className="c-event-it__stats">
          <time dateTime={item.createdAt}>{createdAt.fromNow(true)}</time>
          <a
            className="c-event-it__topic"
            href={toFullUrl(
              OurnetProjectName.NEWS,
              country,
              links.news.page("business", { ul: lang })
            )}
          >
            {locales.business()}
          </a>
        </div>
      )}
    </div>
  );
}
