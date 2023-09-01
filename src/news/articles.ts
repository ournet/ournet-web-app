import { OurnetQueryApi } from "@ournet/api-client";

export type GetArticlesParams = {
  lang: string;
  country: string;
  limit: number;
  offset?: number;
};

export const fillGetArticles = <T>(
  apiClient: OurnetQueryApi<T>,
  key: keyof T,
  { country, lang, limit }: GetArticlesParams
) => {
  apiClient.findArticle(
    key,
    {
      fields: `id title description imageId status type expitesAt countViews createdAt`,
    },
    {
      country,
      lang,
      limit,
    }
  );
};
