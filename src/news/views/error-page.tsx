
import * as React from 'react';
import { boomify } from 'boom';
import { ErrorViewModel } from '../view-models/error-view-model';
import CommonLayout from './common-layout';
import env from '../../env';
import { EventListItem } from './components/event-list-item';
import PageContentSection from '../../views/components/page-content-section';

export default class ErrorPage extends React.Component<ErrorViewModel> {
    render() {
        const { locales, error, latestEvents, head, lang, country, config, links } = this.props;

        const boomError = boomify(error);
        const errorCode = boomError.isServer ? 500 : 404;
        const title = boomError.isServer ? locales.error_500_info() : locales.error_404_info();

        head.title = `${locales.error()}: ${errorCode}`;

        return (
            <CommonLayout {...this.props}>
                <PageContentSection>
                    <main>
                        <div className='c-error-h'>
                            <h1>{locales.error()}: <span>{errorCode}</span></h1>
                            <h4>{title}</h4>
                            {!env.isProduction && <p>{JSON.stringify(boomError.output)}</p>}
                        </div>

                        <div className='c-section'>
                            <div className='o-layout'>
                                {latestEvents && latestEvents.map(item => <div key={item.id} className='o-layout__item u-1/2@mobile u-1/4@tablet'>{EventListItem({ lang, country, links, timezone: config.timezone, item, view: 'card' })}</div>)}
                            </div>
                        </div>
                    </main>
                </PageContentSection>
            </CommonLayout >
        )
    }
}
