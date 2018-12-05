
import * as React from 'react';
import { Share } from './share';

export type StickyTitleProps = {
    title: string
    url: string
    shareServices: string[]
    lang: string
    size?: 'small' | 'large'
}

export function StickyTitle({ title, url, shareServices: services, lang, size }: StickyTitleProps) {

    const viewSize = size ? ' v--' + size : '';

    return (
        <div className={'c-sticky-title'+viewSize}>
            <div className='o-wrapper o-wrapper--small'>
                <div className='o-layout o-layout--small'>
                    <div className='o-layout__item u-4/5'>
                        <h3 className='c-sticky-title__h'>{title}</h3>
                    </div>
                    <div className='o-layout__item u-1/5'>
                        <div className='c-sticky-title__share'>
                            {Share({ services, lang, url })}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
