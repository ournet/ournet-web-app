
import * as React from 'react';
import { NewsEvent } from '@ournet/api-client';
import { TranslateFunction } from '../../../ournet/locale';
import { ImageStorageHelper } from '@ournet/images-domain';
import { NewsLocaleNames } from '../../locale';
import { truncateAt } from '../../../helpers';
import { createMediaGalleryModel } from '../../view-models/media-gallery-model';
import GalleryResources from '../components/gallery-resources';

export type EventMediaProps = {
    translate: TranslateFunction
    event: NewsEvent
    image?: EventMediaPropsImage
}

export type EventMediaPropsImage = {
    id: string
    masterUrl: string
    largeUrl: string
    host: string
}



export function EventMedia({ translate, event, image }: EventMediaProps) {

    image = image || {
        id: event.imageId,
        masterUrl: ImageStorageHelper.eventUrl(event.imageId, 'master', 'jpg'),
        largeUrl: ImageStorageHelper.eventUrl(event.imageId, 'large', 'jpg'),
        host: event.imageHost,
    };

    const mediaTitle = translate(NewsLocaleNames.foto_video_from_event_format, { name: truncateAt(event.title, 70) });
    const imageColor = image.id.split(/-/g)[1];

    const galleryModel = createMediaGalleryModel({ event });

    galleryModel.startId = image.id;

    return (
        <a className='c-event-media js-media-dialog' data-gallery={JSON.stringify(galleryModel)} style={{ backgroundColor: `#${imageColor}` }} data-event-id={event.id} href={image.masterUrl} target='_blank' title={mediaTitle}>
            <img className='c-event-media__pic' alt={event.title} src={image.largeUrl} srcSet={`${image.masterUrl} 1200w, ${image.largeUrl} 640w`} />
            <span className='c-event-media__stats'>
                {event.countImages > 1 && <i className='c-event-media__stats-i'>{event.countImages}<span>{translate(NewsLocaleNames.photo)}</span></i>}
                {event.countVideos > 0 && <i className='c-event-media__stats-v'>{event.countVideos}<span>{translate(NewsLocaleNames.video)}</span></i>}
            </span>
            <span className='c-event-media__copy'>© {image.host}</span>
            {event.countVideos > 0 && <i className='c-event-media__vi'></i>}
            {GalleryResources()}
        </a>
    );
}
