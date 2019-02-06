
import * as React from 'react';
import { IndexViewModel } from '../../view-models/index-view-model';
import CommonLayout from '../common-layout';
import { Share } from '../../../views/components/share';
import { PageTitle } from '../../../views/components/page-title';
import { HoroscopeDayReport } from '../components/horoscope-day-report';

export function IndexPage(props: IndexViewModel) {

    const { lang, head, locales, config, title, subTitle, reports, links } = props;

    return (
        <CommonLayout {...props}>
            <main>
                <div className='u-report-margin'>
                    {Share({ services: config.shareServices, lang, align: 'right', url: head.canonical })}
                    {PageTitle({ title: title || head.title, subTitle: subTitle || head.description })}
                </div>
                {reports.map(report => HoroscopeDayReport({ lang, locales, report, links }))}
            </main>
        </CommonLayout>
    )
}
