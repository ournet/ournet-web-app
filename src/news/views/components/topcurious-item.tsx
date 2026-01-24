import * as React from "react";
import { truncateAt, addUtmSource } from "../../../helpers";
import { TopCuriousNews } from "../../topcurious";

export type TopCuriousListItemProps = {
  item: TopCuriousNews;
  view: EventListItemViewName;
  domain?: string;
};

export type EventListItemViewName =
  | "card"
  | "media-left"
  | "media-right"
  | "card-wide"
  | "card-bare";

export function TopCuriousListItem(props: TopCuriousListItemProps) {
  switch (props.view) {
    case "media-left":
    case "media-right":
      return mediaItemView(props);
    case "card":
    case "card-bare":
    case "card-wide":
      return cardItemView(props);
  }
  return null;
}

function mediaItemView({ item, view, domain }: TopCuriousListItemProps) {
  const url = domain ? addUtmSource(item.url, domain) : item.url;
  return (
    <div
      className={
        "c-event-it c-event-it--media o-media o-media--small" +
        (view === "media-right" ? " o-media--reverse" : "")
      }
    >
      <div className="o-media__img">
        <span className="c-event-it__img o-lazy" data-src={item.image}></span>
      </div>
      <div className="c-event-it__info o-media__body">
        <a target="_blank" rel="noopener noreferrer" className="c-event-it__title" href={url} title={item.title}>
          {truncateAt(item.title, 80)}
        </a>
      </div>
    </div>
  );
}

function cardItemView({ item, view, domain }: TopCuriousListItemProps) {
  const url = domain ? addUtmSource(item.url, domain) : item.url;
  return (
    <div
      className={"c-event-it v--card" + (view !== "card" ? " v--" + view : "")}
    >
      <div className="c-event-it__media">
        <div className="c-event-it__img o-lazy" data-src={item.image}></div>
      </div>
      <div className="c-event-it__hover"></div>

      <a target="_blank" rel="noopener noreferrer" className="c-event-it__doc" title={item.title} href={url}>
        <div className="c-event-it__inner">
          <h3 className="c-event-it__title">{truncateAt(item.title, 100)}</h3>
        </div>
      </a>
    </div>
  );
}
