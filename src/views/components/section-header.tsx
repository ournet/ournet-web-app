
import * as React from 'react';

export type SectionHeaderProps = {
    name: string
    link?: string
    h?: 'h3' | 'h4'
}

export function SectionHeader({ name, link, h }: SectionHeaderProps) {
    h = h || 'h3';

    let hElement: JSX.Element | null = null;
    if (h === 'h3') {
        hElement = <h3>{link ? <a href={link} title={name}>{name}</a> : name}</h3>;
    } else if (h === 'h4') {
        hElement = <h4>{link ? <a href={link} title={name}>{name}</a> : name}</h4>;
    }

    return (
        <div className={'c-section-h'}>
            {hElement}
        </div>
    )
}
