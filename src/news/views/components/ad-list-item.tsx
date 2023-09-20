import * as React from "react";
import { ImageSizeName } from "@ournet/images-domain";
import { truncateAt } from "../../../helpers";
import { Sitemap, toFullUrl } from "ournet.links";
import { OurnetProjectName } from "../../../ournet/data";
import { OurnetLocales } from "../../../locales";
import { EventListItemViewName } from "./event-list-item";
import { cdn } from "ournet.links";

export type AdListItemProps = {
  links: Sitemap;
  lang: string;
  country: string;
  timezone: string;
  view: EventListItemViewName;
  title: string;
  url: string;
  imageId?: string;
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

export function AdListItem(props: AdListItemProps) {
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

function mediaItemView({
  title,
  imageId,
  url,
  imageSize,
  view
}: AdListItemProps) {
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
          data-src={cdn.media.image(imageId || "", {
            size: getImageSize("thumbnail", imageSize),
            ext: "webp"
          })}
        ></span>
      </div>
      <div className="c-event-it__info o-media__body">
        <a className="c-event-it__title" href={url} title={title}>
          {truncateAt(title, 80)}
        </a>
      </div>
    </div>
  );
}

function cardItemView({
  title,
  url,
  imageId,
  imageSize,
  view,
  links,
  lang,
  country,
  locales
}: AdListItemProps) {
  return (
    <div
      className={"c-event-it v--card" + (view !== "card" ? " v--" + view : "")}
    >
      <div className="c-event-it__media">
        <div
          className="c-event-it__img o-lazy"
          data-src={cdn.media.image(imageId || "", {
            size: getImageSize("small", imageSize),
            ext: "webp"
          })}
        ></div>
      </div>
      <div className="c-event-it__hover"></div>
      <a className="c-event-it__doc" title={title} href={url}>
        <div className="c-event-it__inner">
          <h3 className="c-event-it__title">{truncateAt(title, 100)}</h3>
        </div>
      </a>

      <div className="c-event-it__stats">
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
    </div>
  );
}
