
import * as React from 'react';
import { boomify } from 'boom';
import { ErrorViewModel } from '../view-models/error-view-model';
import { HoroscopeLocaleNames } from '../locale';
import CommonLayout from './common-layout';
import env from '../../env';
import { HoroscopeSignsLine } from '../../views/components/horoscope/horoscope-signs-line';

export default class ErrorPage extends React.Component<ErrorViewModel> {
    render() {
        const { translate, error, head, lang, links, country } = this.props;

        const boomError = boomify(error);
        const errorCode = boomError.isServer ? 500 : 404;
        const title = boomError.isServer ? translate(HoroscopeLocaleNames.error_500_info) : translate(HoroscopeLocaleNames.error_404_info);

        head.title = `${translate(HoroscopeLocaleNames.error)}: ${errorCode}`;

        return (
            <CommonLayout {...this.props}>
                <main>
                    <div className='c-error-h'>
                        <h1>{translate(HoroscopeLocaleNames.error)}: <span>{errorCode}</span></h1>
                        <h4>{title}</h4>
                        {!env.isProduction && <p>{JSON.stringify(boomError.output)}</p>}
                    </div>
                    <div className='c-section'>
                        {HoroscopeSignsLine({ lang, country, links })}
                    </div>
                </main>
            </CommonLayout >
        )
    }
}
