import axios from "axios";
import * as Rss from "rss";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36";

export const getRss = async () => {
  const response: {
    data: {
      items: {
        article_id: number;
        cover_thumb_lg: string;
        long_link: string;
        published_at: number;
        site: { link_desktop: string };
        name: string;
      }[];
    };
  } = await axios(`https://protv.md/api/all-news-page`, {
    method: "POST",
    headers: {
      referer: `https://protv.md`,
      origin: `https://protv.md`,
      "user-agent": USER_AGENT
    },
    timeout: 1000 * 10,
    responseType: "json"
  });

  // console.log(response.data.items);

  const date = new Date();

  const feed = new Rss({
    feed_url: `https://news.ournet.ro/rss-proxy/protv.md.xml`,
    site_url: "https://www.protv.md",
    title: "Protv.md rss",
    pubDate: date,
    ttl: 60 * 30
  });

  response.data.items.forEach((it) => {
    feed.item({
      date: new Date(it.published_at * 1000),
      title: it.name,
      url: `${it.site.link_desktop}${it.long_link}`,
      enclosure: { url: it.cover_thumb_lg },
      description: it.name,
      guid: it.article_id ? `id-${it.article_id}` : undefined
    });
  });

  return feed;
};
