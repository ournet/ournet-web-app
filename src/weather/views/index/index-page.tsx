
import * as React from 'react';
import { IndexViewModel } from '../../view-models/index-view-model';
import CommonLayout from '../common-layout';
import { Share } from '../../../views/components/share';
import { PageTitle } from '../../../views/components/page-title';
import { ForecastBrowser } from '../components/forecast/forecast-browser';

export class IndexPage extends React.Component<IndexViewModel> {
    render() {
        const { lang, head, config, placeIds, currentDate, translate } = this.props;

        return (
            <CommonLayout {...this.props}>
                <main>
                    {Share({ url: head.canonical, lang, services: config.shareServices, align: 'right' })}
                    {PageTitle({ title: head.title, subTitle: head.description })}
                    {/* <ForecastBrowser places={placeIds} today={today} days={5} __={__} /> */}
                    {ForecastBrowser({ places: placeIds, today: currentDate, days: 5, translate })}
                </main>
            </CommonLayout>
        )
    }
}
