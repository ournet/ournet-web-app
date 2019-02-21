
import * as React from 'react';

export type PageMenuProps = {
    selectedId?: string
    items: PageMenuItem[]
}

export type PageMenuItem = {
    id: string
    link: string
    title: string
    text: string
}

export default function PageMenu({ items, selectedId }: PageMenuProps) {
    return (
        <div className='c-page-menu'>
            <div className='o-wrapper o-wrapper--small'>
                <ul>
                    {items.map(item => (
                        <li key={item.id} className={`c-page-menu__i${selectedId === item.id ? ' v--selected' : ''}`}>
                            <a href={item.link} title={item.title}>{item.text}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
