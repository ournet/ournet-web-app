import * as React from "react";
import { Sitemap } from "ournet.links";
import { OurnetLocales } from "../../../locales";

export type OutReadMoreProps = {
  url: string;
  links: Sitemap;
  locales: OurnetLocales;
  source: string;
};

export function OutReadMoreLink({
  links,
  url,
  locales,
  source
}: OutReadMoreProps) {
  return (
    <div className="c-out">
      <a target="_blank" rel="nofollow noindex" href={links.news.url({ url })}>
        {locales.read_more_on_source_format({ name: source })} ›
      </a>
    </div>
  );
}
