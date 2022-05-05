import * as React from "react";
import { WeatherViewModel } from "../view-models/weather-view-model";
import Layout from "./layout";
import { getAssetUrl } from "../../assets";
import env from "../../env";
import { AdAside } from "./components/ads/ad-aside";
import { getSchema, getHost } from "ournet.links";
import { OurnetProjectName } from "../../ournet/data";
import { EventListItem } from "../../news/views/components/event-list-item";
import { SectionHeader } from "../../views/components/section-header";
import { HoroscopeSvg } from "../../views/components/horoscope/horoscope-svg";
import { GroupHeader } from "../../views/components/group-header";
import { HoroscopeSignsLine } from "../../views/components/horoscope/horoscope-signs-line";
import PageContentSection from "../../views/components/page-content-section";

export default class CommonLayout extends React.Component<WeatherViewModel> {
  render() {
    const {
      project,
      children,
      lang,
      country,
      config,
      locales,
      links,
      latestNews,
      containsProject
    } = this.props;

    return (
      <Layout {...this.props}>
        {containsProject(OurnetProjectName.HOROSCOPE) && HoroscopeSvg()}
        <PageContentSection>
          <div className="o-layout">
            <div className="o-layout__item u-4/6@tablet">
              {children}
              {containsProject(OurnetProjectName.HOROSCOPE) && (
                <div className="c-group">
                  {GroupHeader({
                    name: locales.horoscope(),
                    link:
                      getSchema(OurnetProjectName.HOROSCOPE, country) +
                      "//" +
                      getHost(OurnetProjectName.HOROSCOPE, country) +
                      links.horoscope.home({ ul: lang })
                  })}
                  {HoroscopeSignsLine({ lang, links, project, country })}
                </div>
              )}
            </div>
            <div className="o-layout__item u-2/6@tablet">
              {!config.disabledAds && AdAside()}
              {config.domain === "moti2.al" && (
                <div id="M454705ScriptRootC701836">
                  <div id="M454705PreloadC701836"></div>
                  <script
                    dangerouslySetInnerHTML={{
                      __html: `(function(){
                                    var D=new Date(),d=document,b='body',ce='createElement',ac='appendChild',st='style',ds='display',n='none',gi='getElementById',lp=d.location.protocol,wp=lp.indexOf('http')==0?lp:'https:';
                                    var i=d[ce]('iframe');i[st][ds]=n;d[gi]("M454705ScriptRootC701836")[ac](i);try{var iw=i.contentWindow.document;iw.open();iw.writeln("<ht"+"ml><bo"+"dy></bo"+"dy></ht"+"ml>");iw.close();var c=iw[b];}
                                    catch(e){var iw=d;var c=d[gi]("M454705ScriptRootC701836");}var dv=iw[ce]('div');dv.id="MG_ID";dv[st][ds]=n;dv.innerHTML=701836;c[ac](dv);
                                    var s=iw[ce]('script');s.async='async';s.defer='defer';s.charset='utf-8';s.src=wp+"//jsc.mgid.com/m/o/moti2.al.701836.js?t="+D.getUTCFullYear()+D.getUTCMonth()+D.getUTCDate()+D.getUTCHours();c[ac](s);})();`
                    }}
                  ></script>
                </div>
              )}
              {latestNews && latestNews.length > 0 && (
                <div className="c-section">
                  {SectionHeader({
                    name: locales.latest_news(),
                    link:
                      getSchema(OurnetProjectName.NEWS, country) +
                      "//" +
                      getHost(OurnetProjectName.NEWS, country) +
                      links.news.home({ ul: lang })
                  })}
                  <div className="o-layout o-layout--small">
                    {latestNews.map((item) => (
                      <div key={item.id} className="o-layout__item">
                        {EventListItem({
                          lang,
                          country,
                          project,
                          links,
                          timezone: config.timezone,
                          item,
                          view: "card-bare",
                          imageSize: "small"
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </PageContentSection>
        <script
          async={true}
          src={getAssetUrl(project, "js", "main", env.isProduction)}
        />
      </Layout>
    );
  }
}
