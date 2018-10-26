
import * as React from 'react';

export type ShareProps = {
    services: string[]
    align?: string
    url?: string
    lang: string
}

export function Share({ url, lang, services, align }: ShareProps) {

    return (
        <div className={'o-share' + (align ? ' o-share--right' : '')}>
            <script async={true} src="//yastatic.net/share2/share.js"></script>
            <div className="ya-share2" data-services={services.join(',')} data-counter="" data-lang={lang} data-url={url}></div>
        </div>
    )
}
