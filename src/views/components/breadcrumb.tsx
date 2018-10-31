
import * as React from 'react';

export type BreadcrumbData = {
    items: BreadcrumbDataItem[]
}

export type BreadcrumbDataItem = {
    url: string
    text: string
    title?: string
}

export function Breadcrumb({ items }: BreadcrumbData) {

    return (
        <nav aria-label="breadcrumb" className='c-breadcrumb'>
            {items.map((link, index) => {
                if (index === items.length - 1) {
                    return <a key={index} href={link.url} title={link.title}>{link.text}</a>;
                } else {
                    return [<a key={index} href={link.url} title={link.title}>{link.text}</a>, ' › ']
                }
            })}
        </nav>
    )
}
