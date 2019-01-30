import * as React from 'react';
import { VideoEmbedViewModel } from '../../view-models/video-embed-view-model';
import env from '../../../env';
import { getAssetUrl } from '../../../assets';

export default class VideoEmbed extends React.Component<VideoEmbedViewModel> {
    render() {
        const { lang, country, config, project, head, video, locales } = this.props;

        let content: any | null = null;
        if (!video) {
            content = <h1>{locales.error_404_info()}</h1>
        } else {
            if (video.sourceType === 'IFRAME') {
                content = (
                    <iframe className='c-embed-video_object' src={video.sourceId} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
                )
            } else if (video.sourceType === 'YOUTUBE') {
                content = (
                    <iframe className='c-embed-video_object' src={`https://www.youtube.com/embed/${video.sourceId}?autoplay=1&rel=0`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
                )
            } else if (video.sourceType === 'VIMEO') {
                content = (
                    <iframe className='c-embed-video_object' src={`https://player.vimeo.com/video/${video.sourceId}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
                )
            } else if (video.sourceType === 'URL') {
                content = (
                    <video className='c-embed-video_object' controls={true} src={video.sourceId} autoPlay={true}>
                        <p>Your browser doesn't support HTML5 video.</p>
                    </video>
                )
            }
        }

        return (
            <html lang={lang}>
                <head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimal-ui" />
                    <title>Embed Video</title>
                    {head.canonical && <link rel="canonical" href={head.canonical} />}
                    <link key='1' type="text/css" rel="stylesheet" href={getAssetUrl(project, 'css', 'embed-video', env.isProduction)} />
                    <link rel="dns-prefetch" href="//assets.ournetcdn.net" />
                    <script dangerouslySetInnerHTML={{ __html: `window.CONSTANTS={lang:"${lang}",country:"${country}"};` }}></script>
                </head>
                <body className={`proj-${project} country-${country}`}>
                    <script dangerouslySetInnerHTML={{
                        __html: `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', '${config.googleAnalyticsId}', '${config.domain}');
ga('set', 'dimension1', '${project}');
ga('send', 'pageview');`}}></script>
                    <div className='c-embed-video'>
                        {content}
                    </div>
                </body>
            </html>
        )
    }
}