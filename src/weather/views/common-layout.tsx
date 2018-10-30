import * as React from 'react';
import { WeatherViewModel } from '../view-models/weather-view-model';
import Layout from './layout';
import { getAssetUrl } from '../../assets';
import env from '../../env';
import { AdAside } from './components/ads/ad-aside';
import { ExploreMenu } from './components/explore-menu';

export default class CommonLayout extends React.Component<WeatherViewModel> {
    render() {
        const { project, children, lang, country, mainPlaces, config, translate, links } = this.props;
        return (
            <Layout {...this.props}>
                <div className="o-layout">
                    <div className="o-layout__item u-1/5 u-hide-mobile u-1/6@desktop">
                        {ExploreMenu({lang, country, links, translate, config, places:mainPlaces})}
                    </div>
                    <div className="o-layout__item u-4/5@tablet u-3/6@desktop">
                        {children}
                        {/* {config.projects.includes('horoscope') && <HoroscopeGroup {...this.props} />} */}
                    </div>
                    <div className="o-layout__item u-2/6@desktop">
                        {/* <LatestNews {...this.props} /> */}
                        {AdAside()}
                    </div>
                </div>
                <script async={true} src={getAssetUrl(project, 'js', 'main', env.isProduction)} />
            </Layout>
        )
    }
}
