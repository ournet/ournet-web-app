import axios from "axios";
import * as Rss from "rss";
import { URL } from "url";
import * as Xray from "x-ray";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36";

const x = Xray();

export const getRss = async () => {
  const { data: html } = await axios(`https://www.agerpres.ro`, {
    method: "GET",
    headers: {
      referer: `https://www.agerpres.ro`,
      origin: `https://www.agerpres.ro`,
      "user-agent": USER_AGENT
    },
    timeout: 1000 * 10,
    responseType: "text"
  });

  const data: any[] = await x(
    html,
    `.last_news:has(.title_box:contains("ULTIMELE STIRI")) .wrap_last_news article`,
    [{ url: "@onclick", title: ".title_news h2", date: "time@datetime" }]
  );

  // console.log(data);

  const date = new Date();

  const feed = new Rss({
    feed_url: `https://news.ournet.ro/rss-proxy/tv8.md.xml`,
    site_url: "https://www.tv8.md",
    title: "Tv8.md rss",
    pubDate: date,
    ttl: 60 * 30
  });

  data
    .filter((it) => it.title)
    .forEach((it) => {
      const title = it.title.trim();
      let url = /window.location.assign\('([^']+)/.exec(it.url)![1];
      if (!url) return;
      url = new URL(url, "https://www.agerpres.ro").toString();
      feed.item({
        date: it.date ? new Date(it.date) : date,
        title,
        url,
        description: title
      });
    });

  return feed;
};
