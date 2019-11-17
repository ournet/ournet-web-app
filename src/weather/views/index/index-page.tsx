
import * as React from 'react';
import { IndexViewModel } from '../../view-models/index-view-model';
import CommonLayout from '../common-layout';
import { PageTitle } from '../../../views/components/page-title';
import { ForecastBrowser } from '../components/forecast/forecast-browser';

export class IndexPage extends React.Component<IndexViewModel> {
    render() {
        const { head, placeIds, currentDate, locales } = this.props;

        return (
            <CommonLayout {...this.props}>
                <main>
                    {PageTitle({ title: head.title, subTitle: head.description })}
                    {ForecastBrowser({ places: placeIds, today: currentDate, days: 5, locales })}
                </main>
            </CommonLayout>
        )
    }
}
