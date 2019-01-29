
import * as React from 'react';
import { NewsEvent } from '@ournet/api-client';
import { ImageStorageHelper } from '@ournet/images-domain';
import { truncateAt } from '../../../helpers';
import { createMediaGalleryModel } from '../../view-models/media-gallery-model';
import GalleryResources from '../components/gallery-resources';
import { OurnetLocales } from '../../../locales';
import { Sitemap } from 'ournet.links';

export type EventMediaProps = {
    locales: OurnetLocales
    event: NewsEvent
    image?: EventMediaPropsImage
    links: Sitemap
    lang: string
}

export type EventMediaPropsImage = {
    id: string
    masterUrl: string
    largeUrl: string
    host: string
}



export function EventMedia({ locales, event, image, lang, links }: EventMediaProps) {

    image = image || {
        id: event.imageId,
        masterUrl: ImageStorageHelper.eventUrl(event.imageId, 'master', 'jpg'),
        largeUrl: ImageStorageHelper.eventUrl(event.imageId, 'large', 'jpg'),
        host: event.imageHost,
    };

    const mediaTitle = locales.foto_video_from_event_format({ name: truncateAt(event.title, 70) });
    const imageColor = image.id.split(/-/g)[1];

    const galleryModel = createMediaGalleryModel({ event, lang, links: links.news });

    galleryModel.startId = image.id;

    return (
        <a className='c-event-media js-media-dialog' data-gallery={JSON.stringify(galleryModel)} style={{ backgroundColor: `#${imageColor}` }} data-event-id={event.id} href={image.masterUrl} target='_blank' title={mediaTitle}>
            <img className='c-event-media__pic' alt={event.title} src={image.largeUrl} srcSet={`${image.masterUrl} 1200w, ${image.largeUrl} 640w`} />
            <span className='c-event-media__stats'>
                {event.countImages > 1 && <i className='c-event-media__stats-i'>{event.countImages}<span>{locales.photo()}</span></i>}
                {event.countVideos > 0 && <i className='c-event-media__stats-v'>{event.countVideos}<span>{locales.video()}</span></i>}
            </span>
            <span className='c-event-media__copy'>© {image.host}</span>
            {event.countVideos > 0 && <i className='c-event-media__vi'></i>}
            {GalleryResources()}
        </a>
    );
}
