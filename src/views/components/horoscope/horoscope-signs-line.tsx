import * as React from "react";
import { Sitemap, getSchema, getHost } from "ournet.links";
import { OurnetProjectName } from "../../../ournet/data";
import { HoroscopesHelper, HoroscopeSign } from "@ournet/horoscopes-domain";

export type HoroscopeSignsLineProps = {
  lang: string;
  links: Sitemap;
  project?: OurnetProjectName;
  country: string;
};

export function HoroscopeSignsLine({
  lang,
  links,
  project,
  country
}: HoroscopeSignsLineProps) {
  const host =
    project && project !== OurnetProjectName.HOROSCOPE
      ? getSchema(OurnetProjectName.HOROSCOPE, country) +
        "//" +
        getHost(OurnetProjectName.HOROSCOPE, country)
      : "";

  return (
    <div className="o-pack o-pack--tiny">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((id) => {
        const sign = HoroscopesHelper.getSignName(id as HoroscopeSign, lang);
        if (!sign) {
          return null;
        }
        return (
          <div key={id} className="o-pack__item">
            <div className="c-zs-icon">
              <a
                title={sign.name}
                href={host + links.horoscope.sign(sign.slug, { ul: lang })}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <use href={`#svg-zs-icon-${id}`}></use>
                </svg>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
