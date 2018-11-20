
import * as React from 'react';
import { WidgetViewModel } from '../../view-models/widget-view-model';
import { Share } from '../../../views/components/share';
import { PageTitle } from '../../../views/components/page-title';
import { Widget1Config } from './components/widget1-config';
import { Widget2Config } from './components/widget2-config';
import { WidgetConfigs } from './components/widget-configs';
import { getAssetUrl } from '../../../assets';
import env from '../../../env';
import Layout from '../layout';

export function WidgetPage(props: WidgetViewModel) {

    const { locales, lang, config, head, project } = props;

    return (
        <Layout {...props}>
            <main>
                <div className='o-layout'>
                    <div className='o-layout__item u-2/5@tablet'>
                        {Share({ url: head.canonical, services: config.shareServices, lang, align: 'right' })}
                        {PageTitle({ title: head.title, subTitle: head.description })}

                        <div id='widget-configs'>
                            <input id='widget-config-type' type='hidden' defaultValue='widget' />
                            {WidgetConfigs({ previewSelector: '#widget-iframe', scriptSelector: '#widget-script', tabs: { widget: 'Widget 1', widget2: 'Widget 2' }, selected: 0, contents: [Widget1Config(props), Widget2Config(props)] })}
                        </div>
                        <br />
                        <Share url={head.canonical} services={config.shareServices} lang={lang} />
                        <br />
                        <br />
                    </div>
                    <div className='o-layout__item u-3/5@tablet'>
                        <div id='widget-preview'>
                            <h3>{locales.preview()}</h3>
                            <br />
                            <div id='widget-iframe'></div>
                            <br />
                            <h3>{locales.html_code()}</h3>
                            <textarea id="widget-script"></textarea>
                        </div>
                    </div>
                </div>
            </main>
            <link type="text/css" rel="stylesheet" href={getAssetUrl(project, 'css', 'page-widget', env.isProduction)} />
            <script async={true} src={getAssetUrl(project, 'js', 'page-widget', env.isProduction)} />

        </Layout>
    )
}
