
import * as React from 'react';
import { IndexViewModel } from '../../view-models/index-view-model';
import CommonLayout from '../common-layout';
import { PageTitle } from '../../../views/components/page-title';
import { HoroscopeDayReport } from '../components/horoscope-day-report';

export function IndexPage(props: IndexViewModel) {

    const { lang, head, locales, title, subTitle, reports, links } = props;

    return (
        <CommonLayout {...props}>
            <main>
                {PageTitle({ title: title || head.title, subTitle: subTitle || head.description })}
                {reports.map(report => HoroscopeDayReport({ lang, locales, report, links }))}
            </main>
        </CommonLayout>
    )
}
