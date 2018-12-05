
import * as React from 'react';

export type ShareProps = {
    services: string[]
    align?: 'right'
    url?: string
    lang: string
}

export function Share({ url, lang, services, align }: ShareProps) {

    return (
            <div className={'c-share' + (align ? ' v--' + align : '')} data-services={services.join(',')} data-lang={lang} data-url={url}></div>
    )
}
