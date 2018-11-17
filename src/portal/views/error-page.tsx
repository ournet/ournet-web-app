
import * as React from 'react';
import { boomify } from 'boom';
import { ErrorViewModel } from '../view-models/error-view-model';
import { PortalLocaleNames } from '../locale';
import CommonLayout from './common-layout';
import env from '../../env';
import { EventListItem } from '../../news/views/components/event-list-item';

export default class ErrorPage extends React.Component<ErrorViewModel> {
    render() {
        const { translate, error, latestEvents, head, lang, country, config, links, project } = this.props;
        const boomError = boomify(error);
        const errorCode = boomError.isServer ? 500 : 404;
        const title = boomError.isServer ? translate(PortalLocaleNames.error_500_info) : translate(PortalLocaleNames.error_404_info);

        head.title = `${translate(PortalLocaleNames.error)}: ${errorCode}`;

        return (
            <CommonLayout {...this.props}>
                <main>
                    <div className='c-error-h'>
                        <h1>{translate(PortalLocaleNames.error)}: <span>{errorCode}</span></h1>
                        <h4>{title}</h4>
                        {!env.isProduction && <p>{JSON.stringify(boomError.output)}</p>}
                    </div>

                    <div className='c-section'>
                        <div className='o-layout'>
                            {latestEvents.map(item => <div key={item.id} className='o-layout__item u-1/2@mobile u-1/4@tablet'>{EventListItem({ lang, country, links, timezone: config.timezone, item, view: 'card', project })}</div>)}
                        </div>
                    </div>
                </main>
            </CommonLayout >
        )
    }
}
