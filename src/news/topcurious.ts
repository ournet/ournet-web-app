import axios from "axios";

export type TopCuriousNews = {
  url: string;
  title: string;
  image: string;
  description: string;
};

const cache: { [lang: string]: { news: TopCuriousNews[]; date: Date } } = {};
const languages = ["ro", "en", "es", "it"];

export const getTopCurious = (lang: string): TopCuriousNews[] => {
  if (!languages.includes(lang)) return [];
  const data = cache[lang];
  if (data) {
    if (data.date.getTime() > Date.now() - 1000 * 86400) {
      return data.news;
    }
  }

  axios({
    url: `https://www.topcurious.com/${lang}/latest.json`,
    timeout: 10 * 1000
  })
    .then(
      (res) => res.data,
      (error) => console.log(error.message)
    )
    .then((news) => {
      if (Array.isArray(news)) cache[lang] = { news, date: new Date() };
    });

  return [];
};
