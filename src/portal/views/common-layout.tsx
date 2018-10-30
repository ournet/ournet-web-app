import * as React from 'react';
import { PortalViewModel } from '../view-models/portal-view-model';
import Layout from './layout';
import { getAssetUrl } from '../../assets';
import env from '../../env';
import { TrendingTopicsMenu } from '../../news/views/components/trending-topics-menu';

export default class CommonLayout extends React.Component<PortalViewModel> {
    render() {
        const { project, children, lang, links, trendingTopics, country } = this.props;
        return (
            <Layout {...this.props}>
                {TrendingTopicsMenu({ lang, links, topics: trendingTopics, country, project })}
                {children}
                <script async={true} src={getAssetUrl(project, 'js', 'main', env.isProduction)} />
            </Layout>
        )
    }
}
