
import * as React from 'react';

export type PageTitleProps = {
    title: string
    subTitle?: React.ReactNode
    h?: 1 | 2 | 3 | 4
}

export function PageTitle({ title, subTitle }: PageTitleProps) {

    return (
        <div className='c-page-title'>
            <h1>{title}</h1>
            {subTitle && <h2>{subTitle}</h2>}
        </div>
    )
}
