import * as React from 'react';
import { NewsViewModel } from '../view-models/news-view-model';
import Layout from './layout';
import { getAssetUrl } from '../../assets';
import env from '../../env';
import { TrendingTopicsMenu } from './components/trending-topics-menu';

export default class CommonLayout extends React.Component<NewsViewModel> {
    render() {
        const { project, children, lang, links, trendingTopics, country } = this.props;
        return (
            <Layout {...this.props}>
                {TrendingTopicsMenu({ lang, links, topics: trendingTopics, country })}
                {children}
                <script async={true} src={getAssetUrl(project, 'js', 'main', env.isProduction)} />
            </Layout>
        )
    }
}
