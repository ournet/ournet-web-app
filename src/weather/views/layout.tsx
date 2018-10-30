
import * as React from 'react';
import RootLayout from '../../views/root-layout';
import { WeatherViewModel } from '../view-models/weather-view-model';
import { AccentLine } from '../../views/components/accent-line';
import { PageHeader } from './components/page-header';
import { PageFooter } from './components/page-footer';

export default class Layout extends React.Component<WeatherViewModel, any> {
    render() {
        const { children } = this.props;

        return (
            <RootLayout {...this.props}>
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
