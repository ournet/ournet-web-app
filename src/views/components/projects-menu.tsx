import * as React from "react";
import { Sitemap } from "ournet.links";
import { OurnetLocales } from "../../locales";
import { OurnetProjectName } from "../../ournet/data";
import { resolveProjectLinkPrefix } from "../../helpers";

interface ProjectsMenuProps {
  lang: string;
  country: string;
  locales: OurnetLocales;
  links: Sitemap;
  project: OurnetProjectName;
  containsProject: (project: OurnetProjectName) => boolean;
}

export function ProjectsMenu({
  links,
  locales,
  lang,
  project,
  country,
  containsProject
}: ProjectsMenuProps) {
  if (!links.portal) {
    return null;
  }

  const menuitems: { name: string; link: string; className: string }[] = [
    {
      name: locales.news(),
      link:
        resolveProjectLinkPrefix(project, OurnetProjectName.NEWS, country) +
        links.news.home({ ul: lang }),
      className:
        "v--news" +
        (project === OurnetProjectName.NEWS ? " c-menu--selected" : "")
    },
    {
      name: locales.weather(),
      link:
        resolveProjectLinkPrefix(project, OurnetProjectName.WEATHER, country) +
        links.weather.home({ ul: lang }),
      className:
        "v--weather" +
        (project === OurnetProjectName.WEATHER ? " c-menu--selected" : "")
    },
    containsProject(OurnetProjectName.HOROSCOPE)
      ? {
          name: locales.horoscope(),
          link:
            resolveProjectLinkPrefix(
              project,
              OurnetProjectName.HOROSCOPE,
              country
            ) + links.horoscope.home({ ul: lang }),
          className:
            "v--horo" +
            (project === OurnetProjectName.HOROSCOPE ? " c-menu--selected" : "")
        }
      : (null as never)
  ].filter((it) => !!it);

  return (
    <ul className="c-menu">
      {menuitems.map((item, i) => (
        <li key={i}>
          <a className={item.className} href={item.link}>
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  );
}
