
import * as React from 'react';
import { NewsItem, NewsEvent } from '@ournet/api-client';
import { ImageStorageHelper } from '@ournet/images-domain';
import { Sitemap } from 'ournet.links';
import { EventMediaPropsImage, EventMedia } from '../event/event-media';
import { truncateAt } from '../../../helpers';
import { createMediaGalleryModel } from '../../view-models/media-gallery-model';
import GalleryResources from '../components/gallery-resources';
import { OurnetLocales } from '../../../locales';

export type ItemMediaProps = {
    item: NewsItem
    event?: NewsEvent
    links: Sitemap
    locales: OurnetLocales
    lang: string
}



export function ItemMedia({ item, event, locales, lang, links }: ItemMediaProps) {

    if (!item.imagesIds && !event) {
        return null;
    }

    let image: EventMediaPropsImage | undefined;
    if (item.imagesIds && item.imagesIds.length) {
        const imageId = item.imagesIds[0];
        const imageMasterUrl = ImageStorageHelper.newsUrl(imageId, 'master', 'jpg');
        const imageLargeUrl = ImageStorageHelper.newsUrl(imageId, 'large', 'jpg');
        image = {
            id: imageId,
            host: item.urlHost,
            masterUrl: imageMasterUrl,
            largeUrl: imageLargeUrl,
        };
    }

    if (event) {
        return EventMedia({ event, image, locales, lang, links });
    }

    if (!image) {
        return null;
    }

    const mediaTitle = locales.foto_video_from_event_format({ name: truncateAt(item.title, 70) });
    const imageColor = image.id.split(/-/g)[1];

    const galleryModel = createMediaGalleryModel({ event, item, links: links.news, lang });

    return (
        <a className={`c-event-media js-media-dialog${item.videoId ? ' v--video' : ''}`} data-gallery={JSON.stringify(galleryModel)} style={{ backgroundColor: `#${imageColor}` }} href={image.masterUrl} target='_blank' title={mediaTitle}>
            <img className='c-event-media__pic' alt={item.title} src={image.largeUrl} srcSet={`${image.masterUrl} 1200w, ${image.largeUrl} 640w`} />
            <span className='c-event-media__copy'>© {image.host}</span>
            {item.videoId && [<i key='ki1' className='c-event-media__hover'></i>,<i key='ki2' className='c-event-media__vi'></i>]}
            {GalleryResources()}
        </a>
    );
}
