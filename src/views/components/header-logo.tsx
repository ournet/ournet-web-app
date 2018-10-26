
import * as React from 'react';

export type HeaderLogoProps = {
    title: string
    url: string
}

export function HeaderLogo({ url, title }: HeaderLogoProps) {

    return (
        <div className='c-logo'>
            <a className='c-logo__img' href={url} title={title} />
        </div>
    )
}
