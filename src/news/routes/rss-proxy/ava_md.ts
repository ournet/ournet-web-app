import axios from "axios";
import * as Rss from "rss";

const Xray = require("x-ray");

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36";

const x = Xray();

export const getRss = async () => {
  const { data: html } = await axios(`https://www.ava.md/ru/`, {
    method: "GET",
    headers: {
      referer: `https://www.ava.md/ru/`,
      origin: `https://www.ava.md`,
      "user-agent": USER_AGENT
    },
    timeout: 1000 * 10,
    responseType: "text"
  });

  const data: any[] = await x(html, `div.analitics__item`, [
    {
      url: "a.item-analitics__title@href",
      title: "a.item-analitics__title",
      description: ".item-analitics__description"
    }
  ]);

  // console.log(data);

  const date = new Date();

  const feed = new Rss({
    feed_url: `https://news.ournet.ro/rss-proxy/ava.md.xml`,
    site_url: `https://www.ava.md`,
    title: "ava.md rss",
    pubDate: date,
    ttl: 60 * 30
  });

  data
    .filter((it) => it.title && it.url && it.url.startsWith("/"))
    .forEach((it) => {
      feed.item({
        date: date,
        title: it.title.trim(),
        url: `https://www.ava.md${it.url}`,
        // enclosure: { url: it.image },
        description: it.description || it.title
      });
    });

  return feed;
};
