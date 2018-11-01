
import * as React from 'react';
import RootLayout from '../../views/root-layout';
import { HoroscopeViewModel } from '../view-models/horoscope-view-model';
import { AccentLine } from '../../views/components/accent-line';
import { PageHeader } from './components/page-header';
import { PageFooter } from './components/page-footer';
import { HoroscopeSvg } from '../../views/components/horoscope/horoscope-svg';

export default class Layout extends React.Component<HoroscopeViewModel, any> {
    render() {
        const { children } = this.props;

        return (
            <RootLayout {...this.props}>
                {HoroscopeSvg()}
                {AccentLine()}
                <div className='o-wrapper o-wrapper--small'>
                    {PageHeader(this.props)}
                    {children}
                </div>
                {PageFooter(this.props)}
            </RootLayout>
        )
    }
}
