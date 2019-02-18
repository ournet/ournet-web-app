
import * as React from 'react';
import CommonLayout from '../common-layout';
import { SectionHeader } from '../../../views/components/section-header';
import { EventListItem } from '../components/event-list-item';
import { QuoteListItem } from '../components/quote-list-item';
import PageContentSection from '../../../views/components/page-content-section';
import { AdAside } from '../components/ads/ad-aside';
import { QuoteViewModel } from '../../view-models/quote-view-model';
import { ImageStorageHelper } from '@ournet/images-domain';
import { FacebookScript } from '../../../views/components/facebook-script';

export default class QuotePage extends React.Component<QuoteViewModel> {
    render() {
        const { lang, head, country, locales, links, latestEvents, config, event, quote, authorDisplayName } = this.props;
        const byQuotes = this.props.byQuotes.filter(item => item.id !== quote.id);

        head.elements.push(<meta key='og_image' property="og:image" content={ImageStorageHelper.quoteUrl(quote.id)} />);

        return (
            <CommonLayout {...this.props}>
                <PageContentSection>
                    <main>
                        <div className='o-layout'>
                            <div className='o-layout__item u-3/5@tablet'>
                                {QuoteListItem({ lang, country, links, timezone: config.timezone, view: 'main', item: quote, shareServices: config.shareServices })}
                                {event && EventListItem({ lang, country, links, item: event, timezone: config.timezone, view: 'card-wide', imageSize: 'large' })}
                                {config.facebookAppId && <div className='fb-comments' data-href={head.canonical} data-numposts="5" data-width="100%" data-order-by="reverse-time"></div>}
                            </div>
                            <div className='o-layout__item u-2/5@tablet'>
                                {AdAside()}
                                <br/>
                                {byQuotes && byQuotes.length > 0 ? <div>
                                    {SectionHeader({ name: locales.quotes_by_author_format({ name: authorDisplayName }), h: "h4" })}
                                    {byQuotes.map(item => QuoteListItem({ lang, country, links, timezone: config.timezone, view: 'card', item }))}
                                </div> : null}
                            </div>
                        </div>

                        <div className='c-section'>
                            {SectionHeader({ name: locales.latest_events() })}
                            <div className='o-layout'>
                                {latestEvents && latestEvents.map(item => <div key={item.id} className='o-layout__item u-1/2@mobile u-1/4@tablet'>{EventListItem({ lang, country, item, links, timezone: config.timezone, view: 'card' })}</div>)}
                            </div>
                        </div>

                    </main>
                </PageContentSection>
                {config.facebookAppId && FacebookScript(config.facebookAppId, lang, country)}
            </CommonLayout >
        )
    }
}
