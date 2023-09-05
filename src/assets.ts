import { readFileSync } from "fs";
import { join } from "path";

const assets: { [type: string]: { [key: string]: string } } = {};

function getAssetName(project: string, type: "css" | "js", key: string) {
  if (!assets[type]) {
    const data = require(`../public/static/${type}/rev-manifest.json`);
    assets[type] = Object.keys(data).reduce<any>((obj, key) => {
      obj[key] = (/\.([a-z0-9-_]+)\./.exec(data[key]) as string[])[1];
      return obj;
    }, {});
  }
  return assets[type][project + "/" + key + "." + type];
}

export function getAssetUrl(
  project: string,
  type: "css" | "js",
  key: string,
  production: boolean
) {
  if (production) {
    const name = getAssetName(project, type, key);

    return `//assets.ournetcdn.net/ournet/${type}/${project}/${key}.${name}.${type}`;
  }

  return `http://localhost:8080/${type}/${project}/${key}.${type}`;
}

const ASSET_CONTENT: Record<string, string> = {};

export function getAssetContent(
  project: string,
  type: "css" | "js",
  key: string,
  production: boolean
) {
  const name = production ? "." + getAssetName(project, type, key) : "";
  const id = `${type}/${project}/${key}${name}.${type}`;
  if (!ASSET_CONTENT[id]) {
    ASSET_CONTENT[id] = readFileSync(
      join(__dirname, `../public/static/${id}`),
      "utf8"
    );
  }
  return ASSET_CONTENT[id];
}
