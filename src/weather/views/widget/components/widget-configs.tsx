
import * as React from 'react';
import { Dictionary } from '@ournet/domain';

export type WidgetConfigProps = {
    tabs: Dictionary<string>
    selected: number
    contents: any[]
    scriptSelector: string
    previewSelector: string
}

export function WidgetConfigs({ tabs, selected, contents, scriptSelector, previewSelector }: WidgetConfigProps) {

    return (
        <div className='c-wconfig' data-script={scriptSelector} data-preview={previewSelector}>
            <ul className='c-wconfig__tabs'>
                {Object.keys(tabs).map((type, index) => (<li key={index} data-type={type} className={index === selected ? 'c-wconfig__tabs--selected' : undefined}>{tabs[type]}</li>))}
            </ul>
            <ul className='c-wconfig__content'>
                {contents.map((content, index) => (<li key={index} className={index === selected ? undefined : 'u-hidden'}>{content}</li>))}
            </ul>
        </div>
    )
}
