import axios from "axios";
import * as Rss from "rss";

const Xray = require("x-ray");

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36";

const x = Xray();

export const getRss = async (lang = "ro") => {
  const ul = lang === "ru" ? `/ru` : "";
  const { data: html } = await axios(`https://tv8.md${ul}`, {
    method: "GET",
    headers: {
      referer: `https://tv8.md${ul}`,
      origin: `https://tv8.md`,
      "user-agent": USER_AGENT
    },
    timeout: 1000 * 10,
    responseType: "text"
  });

  const data: any[] = await x(html, `a.jss88`, [
    { url: "@href", title: "> img@alt", image: "> img@src" }
  ]);

  // console.log(data);

  const date = new Date();

  const feed = new Rss({
    feed_url: `https://news.ournet.ro/rss-proxy/tv8.md${
      ul ? `-${lang}` : ""
    }.xml`,
    site_url: `https://www.tv8.md${ul}`,
    title: "Tv8.md rss",
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
        url: `https://www.tv8.md${it.url}`,
        enclosure: { url: it.image },
        description: it.title
      });
    });

  return feed;
};
