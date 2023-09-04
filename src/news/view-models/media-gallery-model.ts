import { NewsItem, NewsEvent } from "@ournet/api-client";
import { ImageStorageHelper } from "@ournet/images-domain";
import { uniqByProperty } from "@ournet/domain";
import { NewsSitemap } from "ournet.links";

export type MediaGalleryModel = {
  startId?: string;
  items: MediaGalleryModelItem[];
};

export type MediaGalleryModelItem = {
  type: "image" | "video";
  id: string;
  url: string;
};

export function createMediaGalleryModel({
  event,
  item,
  links,
  lang
}: {
  event?: NewsEvent;
  item?: NewsItem;
  links: NewsSitemap;
  lang: string;
}) {
  const model: MediaGalleryModel = {
    items: []
  };
  if (!event && !item) {
    return model;
  }

  if (event) {
    model.items = (event.imagesIds || []).map(
      (id) =>
        ({
          type: "image",
          id,
          url: ImageStorageHelper.newsUrl(id, "master", "jpg")
        } as MediaGalleryModelItem)
    );

    const startItem = model.items.find((item) => item.id === event.imageId);
    if (startItem) {
      startItem.url = ImageStorageHelper.eventUrl(
        startItem.id,
        "master",
        "jpg"
      );
    } else {
      model.items.unshift({
        type: "image",
        id: event.imageId,
        url: ImageStorageHelper.eventUrl(event.imageId, "master", "jpg")
      });
    }

    if (event.videosIds) {
      model.items = event.videosIds
        .map(
          (id) =>
            ({
              type: "video",
              id,
              url: links.videoEmbed(id, { ul: lang })
            } as MediaGalleryModelItem)
        )
        .concat(model.items);
    }

    if (model.items[0].type !== "video") {
      model.startId = event.imageId;
    }
  }

  if (item) {
    if (item.imagesIds && item.imagesIds.length) {
      model.items = model.items.concat(
        (item.imagesIds || []).map(
          (id) =>
            ({
              type: "image",
              id,
              url: ImageStorageHelper.newsUrl(id, "master", "jpg")
            } as MediaGalleryModelItem)
        )
      );
    }

    if (item.videoId) {
      model.items = [
        {
          type: "video",
          id: item.videoId,
          url: links.videoEmbed(item.videoId, { ul: lang })
        } as MediaGalleryModelItem
      ].concat(model.items);
    }

    if (
      model.items[0].type !== "video" &&
      item.imagesIds &&
      item.imagesIds.length
    ) {
      model.startId = item.imagesIds[0];
    }
  }

  model.items = uniqByProperty(model.items, "id");

  return model;
}
