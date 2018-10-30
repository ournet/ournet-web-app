
import * as React from 'react';
import { boomify } from 'boom';
import { ErrorViewModel } from '../view-models/error-view-model';
import { NewsLocaleNames } from '../locale';
import CommonLayout from './common-layout';
import env from '../../env';
import { EventListItem } from './components/event-list-item';

export default class ErrorPage extends React.Component<ErrorViewModel> {
    render() {
        const { translate, error, latestEvents, head, lang, country, config, links } = this.props;

        const boomError = boomify(error);
        const errorCode = boomError.isServer ? 500 : 404;
        const title = boomError.isServer ? translate(NewsLocaleNames.error_500_info) : translate(NewsLocaleNames.error_404_info);

        head.title = `${translate(NewsLocaleNames.error)}: ${errorCode}`;

        return (
            <CommonLayout {...this.props}>
                <main>
                    <div className='c-error-h'>
                        <h1>{translate(NewsLocaleNames.error)}: <span>{errorCode}</span></h1>
                        <h4>{title}</h4>
                        {!env.isProduction && <p>{JSON.stringify(boomError.output)}</p>}
                    </div>

                    <div className='c-section'>
                        <div className='o-layout'>
                            {latestEvents.map(item => <div key={item.id} className='o-layout__item u-1/2@mobile u-1/4@tablet'>{EventListItem({ lang, country, links, timezone: config.timezone, item, view: 'card' })}</div>)}
                        </div>
                    </div>
                </main>
            </CommonLayout >
        )
    }
}
