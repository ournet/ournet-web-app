import * as React from "react";
import * as moment from "moment-timezone";
import { Widget2ViewModel } from "../../view-models/widget2-view-model";
import { getPlaceName } from "../../../helpers";
import { getHost } from "ournet.links";
import { WeatherHelpers } from "../../helpers";
import coinWebData from "../../../coin-web-data";

export function Widget2Frame(props: Widget2ViewModel) {
  const { lang, widget: info, config, project, country } = props;

  const host = getHost(project, country);
  const widget = formatWidget(props);

  return (
    <html lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <title>Widget2</title>
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html: `*,*:before,*:after{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}
body{background-color:transparent;font-size:.75em;font-family:Arial, Helvetica, Sans-Serif;margin:0;padding:0;color:#848484;}
#widget{background: ${info.color};color:${
              info.textColor
            };text-shadow: 1px 1px 3px ${info.itemColorDark};}
#header{background:${info.itemColorDark};border-bottom:1px solid ${
              info.itemColorDark
            };height: ${info.headerHeight}px;overflow: hidden;}
#header .inner{ padding: 5px 8px;overflow: hidden;}
#header a{ text-decoration: none;}
#header .title{line-height: 30px;font-size: 20px;color:${info.textColor};}
#header .date{ line-height: 12px;font-size: 11px;}
#header .caret{position: absolute;right: 8px;top: 17px;width: 0;height: 0;border-left: 8px solid transparent;border-right: 8px solid transparent;border-top: 8px solid ${
              info.itemBorderColor
            };}
#body{padding: 4px 4px 7px 4px;}
.table{width: 100%;}
.table .item{height: ${info.itemHeight}px;}
.in-table{background:${
              info.itemColor
            };cursor: pointer;overflow: hidden;border-top: 1px solid ${
              info.itemColorLight
            };display: block;margin: 3px;padding: 0px;}
.in-table:hover{background-color:${
              info.itemColorDark
            };-webkit-transition: background-color 0.2s linear;-moz-transition: background-color 0.2s linear;-o-transition: background-color 0.2s linear;-ms-transition: background-color 0.2s linear;transition: background-color 0.2s linear;}
/*      content     */
.table .item .inner{ padding: 5px;overflow: hidden;}
.table .date span{ white-space: nowrap;}
.table .temp{ text-transform: lowercase;font-weight: bold;white-space: nowrap;}
.position-h .table .item li{ float: left;display: inline-block;height: 100%;vertical-align: central;}
.position-h .table .item{ text-align: center;}
.position-h .table .date{ width: ${info.dateWidth};}
.position-h .table .date span{ display: block;}
.position-h .table .date span.day-name{ font-weight: bold;}
.position-h .table .image{ width: ${info.imageWidth};}
.position-h .table .temp{ width: ${info.tempWidth};}
.position-h .table .info{ width: ${info.infoWidth};}
.position-h .info .inner,.position-h .temp .inner,.position-h .date .inner {padding-top: 15%;height: 100%;}
ul,li{ margin: 0px;padding: 0px;list-style: none;}
.table ul{ height: 100%;}
ul ul li{ overflow: hidden;}
.position-v .table{ height: ${info.itemHeight + 2}px;overflow: hidden;}
.position-v li li{ display: block;float: none;text-align: center;vertical-align: middle;}
.position-v .table .item{float: left;min-width: 60px;width:${100 / info.days}%}
.position-v .table .date{ height:${info.dateWidth};}
.position-v .table .date span{ display: block;}
.position-v .table .date span.day-name{ font-weight: bold;}
.position-v .table .image{ height: ${info.imageWidth};}
.position-v .table .temp{ height: ${info.tempWidth};}
.position-v .table .info{ height: ${info.infoWidth};background-color: ${
              info.itemColorDark
            };}
.w-icon {width:40px;height:40px;display: inline-block;}
.w-icon img{width:100%;height:100%;}
`
          }}
        ></style>
        {config.widgetGoogleAnalyticsId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', '${config.widgetGoogleAnalyticsId}', '${host}');
ga('send', 'pageview');`
            }}
          ></script>
        )}
      </head>
      <body dangerouslySetInnerHTML={{ __html: widget }}></body>
    </html>
  );
}

function formatWidget(props: Widget2ViewModel) {
  const { place, lang, links, locales, report, config } = props;
  const { pos, w, header, showInfo, days } = props.widget;
  const id = place.id;
  const placename = getPlaceName(place, lang);
  const longtitle = locales.weather_in_format({ name: placename });
  let title = longtitle;

  const url = links.weather
    .place(id, {
      utm_campaign: "widget",
      utm_source: "widget",
      utm_medium: "iframe",
      ul: lang
    })
    .replace(/&/g, "&amp;");

  if (w < 300) {
    title = placename;
  }

  var body = ['<div id="widget" class="position-' + pos + '">'];

  if (header) {
    body.push('<div id="header"><div class="inner">');
    body.push('<a href="' + url + '" target="_blank" title="' + title + '">');
    body.push(
      '<span class="caret"></span><span class="title">' + title + "</span>"
    );
    body.push("</a></div></div>");
  }

  body.push('<div id="body"><ul class="table">');

  const timezone = !!moment.tz.zone(place.timezone)
    ? place.timezone
    : config.timezone;

  for (var i = 0; i < days && i < report.data.length; i++) {
    const day = report.data[i];

    const symbolName = WeatherHelpers.iconName(day.icon, lang);
    const date = moment(new Date(day.time * 1000))
      .tz(timezone)
      .locale(lang);

    body.push(
      '<li class="item" onclick="window.open(\'' + url + "', '_blank');\">"
    );
    body.push(
      '<ul class="in-table"><li class="date"><div class="inner"><span class="day-name">' +
        date.format("ddd") +
        '</span><span class="day-date">' +
        date.format("D MMM") +
        "</span></div></li>"
    );
    body.push(
      '<li class="image"><div class="inner"><span class="w-icon wi-' +
        day.icon +
        '" title="' +
        symbolName +
        '"><img alt="' +
        title +
        '" src="' +
        WeatherHelpers.iconUrl(day.icon) +
        '" /></span></div></li>'
    );
    body.push(
      '<li class="temp"><div class="inner"><div class="max">' +
        locales.max() +
        " " +
        Math.round(day.temperatureHigh || day.temperature) +
        '&deg;</div><div class="min">' +
        locales.min() +
        " " +
        Math.round(day.temperatureLow || day.temperature) +
        "&deg;</div></div></li>"
    );
    if (showInfo) {
      body.push(
        '<li class="info"><div class="inner">' + symbolName + "</div></li>"
      );
    }
    body.push("</ul></li>");
  }
  body.push("</ul></div></div>");

  const div = body.join("");

  return div + coinWebData.buildJS();
}
