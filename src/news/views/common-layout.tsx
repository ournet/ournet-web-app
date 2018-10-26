import * as React from 'react';
import { NewsViewModel } from '../view-models/news-view-model';
import Layout from './layout';
import { getAssetUrl } from '../../assets';
import env from '../../env';

export default class CommonLayout extends React.Component<NewsViewModel> {
    render() {
        const { project, children } = this.props;
        return (
            <Layout {...this.props}>
                {/* <TrendingTopicsMenu lang={lang} links={links} topics={trendingTopics} /> */}
                {children}
                <script async={true} src={getAssetUrl(project, 'js', 'main', env.isProduction)} />
            </Layout>
        )
    }
}
