import * as React from 'react';
import CommonLayout from '../common-layout';
import { ApiViewModel } from '../../view-models/api-view-model';
import { Share } from '../../../views/components/share';
import { PageTitle } from '../../../views/components/page-title';
import { FacebookScript } from '../../../views/components/facebook-script';

export function ApiPage(props: ApiViewModel) {

    const { lang, head, config, title, subTitle, bodyHtml, country } = props;

    return (
        <CommonLayout {...props}>
            <main>
                {Share({ services: config.shareServices, lang, align: 'right', url: head.canonical })}
                {PageTitle({ title: title || head.title, subTitle: subTitle || head.description })}
                <div className='c-api-doc' dangerouslySetInnerHTML={{ __html: bodyHtml }}></div>
                <br />
                <div className='fb-comments' data-href={head.canonical} data-numposts="5" data-width="100%"></div>
                <br />
            </main>
            {config.facebookId && FacebookScript(config.facebookId, lang, country)}
        </CommonLayout>
    )
}