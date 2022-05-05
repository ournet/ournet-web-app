import {
  LocalesKey,
  LocalizyLocalesProvider,
  LocalizyLocales
} from "./generated-locales";
import { parseTranslationData, Locales } from "localizy";
import { join, basename } from "path";
import { OurnetProjectName } from "./ournet/data";
import { readdirSync, readFileSync } from "fs";
import { getName } from "i18n-iso-countries";

export type Locale = {
  lang: string;
  country: string;
};

export class OurnetTranslator extends LocalizyLocalesProvider<OurnetLocales> {
  protected createInstance(t: Locales) {
    return new OurnetLocales(t);
  }
}

export const OURNET_TRANSLATOR = new OurnetTranslator({
  data: readdirSync(join(__dirname, "..", "locales"))
    .filter((file) => file.endsWith(".json"))
    .map((file) => ({
      lang: basename(file, ".json"),
      data: parseTranslationData(
        JSON.parse(readFileSync(join(__dirname, "..", "locales", file), "utf8"))
      )
    }))
    .reduce<any>((dic, item) => {
      dic[item.lang] = item.data;
      return dic;
    }, {}),
  throwUndefinedKey: true
});

export class OurnetLocales extends LocalizyLocales {
  getCountryName(countryCode: string) {
    return (
      getName(countryCode.toLocaleLowerCase(), this.__locales.language()) || ""
    );
  }

  getInCountryName(countryCode: string) {
    return this.s(`in_country_${countryCode}` as LocalesKey);
  }

  getLanguageName(languageCode: string) {
    return this.s(`language_${languageCode}` as LocalesKey);
  }

  getProjectName(project: OurnetProjectName) {
    return this.s(project as LocalesKey);
  }

  getAppName(project: OurnetProjectName, country: string) {
    return this.s(`${project}_${country}_app_name` as LocalesKey);
  }

  getShortAppName(project: OurnetProjectName, country: string) {
    return this.s(`${project}_${country}_short_app_name` as LocalesKey);
  }

  getHoroStatItemName(item: "health" | "love" | "success") {
    return this.s(item as LocalesKey);
  }
}
