import axios from "axios";
import * as Rss from "rss";

const Xray = require("x-ray");

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36";

const x = Xray();

export const getRss = async () => {
  const { data: html } = await axios(
    `https://www.jurnal.md/ru/category/novosti`,
    {
      method: "GET",
      headers: {
        referer: `https://www.jurnal.md/ru/`,
        origin: `https://www.jurnal.md`,
        "user-agent": USER_AGENT
      },
      timeout: 1000 * 10,
      responseType: "text"
    }
  );

  const data: any[] = await x(html, `div.single-business-news`, [
    {
      url: ".business-news-content-box a@href",
      title: ".business-news-content-box a",
      image: ".business-news-image@data-background-image",
      description: "business-news-content-box p"
    }
  ]);

  // console.log(data);

  const date = new Date();

  const feed = new Rss({
    feed_url: `https://news.ournet.ro/rss-proxy/jurnal.md-ru.xml`,
    site_url: `https://www.jurnal.md`,
    title: "Jurnal.md rss",
    pubDate: date,
    ttl: 60 * 30
  });

  data
    .filter(
      (it) =>
        it.title &&
        it.url &&
        it.url.startsWith("/") &&
        it.image &&
        it.image.startsWith("https://")
    )
    .forEach((it) => {
      feed.item({
        date: date,
        title: it.title.trim(),
        url: `https://www.jurnal.md${it.url}`,
        enclosure: { url: it.image },
        description: it.description
      });
    });

  return feed;
};
