import axios from "axios";
import * as Rss from "rss";

const Xray = require("x-ray");

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36";

const x = Xray();

export const getRss = async () => {
  const { data: html } = await axios(`https://www.zdg.md/ru/`, {
    method: "GET",
    headers: {
      referer: `https://www.zdg.md/ru/`,
      origin: `https://www.zdg.md`,
      "user-agent": USER_AGENT
    },
    timeout: 1000 * 10,
    responseType: "text"
  });

  const data: any[] = await x(html, `#tab1-content .item-post`, [
    {
      url: ".post-right h5 a@href",
      title: ".post-right h5 a"
    }
  ]);

  // console.log(data);

  const date = new Date();

  const feed = new Rss({
    feed_url: `https://news.ournet.ro/rss-proxy/zdg.md-ru.xml`,
    site_url: `https://www.zdg.md`,
    title: "zdg.md rss",
    pubDate: date,
    ttl: 60 * 30
  });

  data
    .filter((it) => it.title && it.url && it.url.startsWith("https"))
    .forEach((it) => {
      feed.item({
        date: date,
        title: it.title.trim(),
        url: it.url,
        // enclosure: { url: it.image },
        description: it.title.trim()
      });
    });

  return feed;
};
