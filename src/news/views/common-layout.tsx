import * as React from 'react';
import { NewsViewModel } from '../view-models/news-view-model';
import Layout from './layout';
import { getAssetUrl } from '../../assets';
import env from '../../env';
import { HoroscopeSvg } from '../../views/components/horoscope/horoscope-svg';

export default class CommonLayout extends React.Component<NewsViewModel> {
    render() {
        const { project, children, links } = this.props;
        return (
            <Layout {...this.props}>
                {links.horoscope && HoroscopeSvg()}
                {children}
                <script async={true} src={getAssetUrl(project, 'js', 'main', env.isProduction)} />
            </Layout>
        )
    }
}
