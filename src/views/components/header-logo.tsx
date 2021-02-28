import * as React from "react";
import { LogoImage } from "./logo-image";

export type HeaderLogoProps = {
  title: string;
  url: string;
  country: string;
};

export function HeaderLogo({ url, title, country }: HeaderLogoProps) {
  return (
    <div className="c-logo">
      <a className="c-logo__a" href={url} title={title}>
        {LogoImage({ country })}
      </a>
    </div>
  );
}
