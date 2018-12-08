
import * as React from 'react';
import { IndexViewModel } from '../../view-models/index-view-model';
import CommonLayout from '../common-layout';
import { Share } from '../../../views/components/share';
import { PageTitle } from '../../../views/components/page-title';
import { ForecastBrowser } from '../components/forecast/forecast-browser';
import { StickyTitle } from '../../../views/components/sticky-title';

export class IndexPage extends React.Component<IndexViewModel> {
    render() {
        const { lang, head, config, placeIds, currentDate, locales } = this.props;

        return (
            <CommonLayout {...this.props}>
                <main>
                    {StickyTitle({ title: head.title, url: head.canonical, lang, shareServices: config.shareServices, size: 'large' })}
                    {Share({ url: head.canonical, lang, services: config.shareServices, align: 'right' })}
                    {PageTitle({ title: head.title, subTitle: head.description })}
                    {/* <ForecastBrowser places={placeIds} today={today} days={5} __={__} /> */}
                    {ForecastBrowser({ places: placeIds, today: currentDate, days: 5, locales })}
                </main>
            </CommonLayout>
        )
    }
}
