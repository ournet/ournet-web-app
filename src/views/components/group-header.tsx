import * as React from "react";

export type GroupHeaderProps = {
  name: string;
  link?: string;
  type?: "important" | "popular" | "new";
};

export function GroupHeader({ name, link, type }: GroupHeaderProps) {
  return (
    <div className={"c-group-h" + (type ? ` c-group-h--${type}` : "")}>
      <h3>{link ? <a href={link}>{name}</a> : name}</h3>
    </div>
  );
}
