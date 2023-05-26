export type EnvData = {
  readonly isProduction: boolean;
  readonly PORT: number;
  readonly PROJECTS: string[];
  readonly PROJECT?: string;
  readonly COUNTRY?: string;
};

export default {
  isProduction: process.env.NODE_ENV === "production",
  PORT: parseInt(process.env.PORT || ""),
  PROJECTS: (process.env.PROJECTS || "")
    .split(/[\s,;]+/g)
    .filter((item) => !!item),

  COUNTRY: process.env.COUNTRY,
  PROJECT: process.env.PROJECT
} as EnvData;
