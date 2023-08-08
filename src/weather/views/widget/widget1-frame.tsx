import * as React from "react";
import { Widget1ViewModel } from "../../view-models/widget1-view-model";
import * as moment from "moment-timezone";
import { getPlaceName } from "../../../helpers";
import * as util from "util";
import { getHost } from "ournet.links";
import { WeatherHelpers } from "../../helpers";
import coinWebData from "../../../coin-web-data";

export function Widget1Frame(props: Widget1ViewModel) {
  const { lang, textcolor, lcolor, config, project, country } = props;

  const host = getHost(project, country);
  const widget = formatWidget(props);

  return (
    <html lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <title>Widget1</title>
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html: `body{font-size:.75em;font-family:Arial, Helvetica, Sans-Serif;margin:0;padding:0;color:#${textcolor};}
.head{padding:5px 6px;font-size:110%;font-weight:bold;white-space:nowrap;}
a{text-decoration:none;}
a:active{color:#ca0000;}
.day{width:25%;}
.day .name{font-weight:bold;text-align:center;}
.day .date{font-size:90%;margin-top:4px;text-align:center;}
.icon{width:25%;position: relative;overflow: hidden;}
.details .temp{text-align:center;font-size:110%;}
.details .name{font-size:90%;margin-top:4px;text-align:center;white-space:nowrap;}
.line{padding:3px 0px;height:36px;overflow: hidden;border-bottom:1px solid #${lcolor};}
.line:last-child{border-bottom:none;}
td{overflow:hidden}
.w-icon {width: 32px;height: 32px;display: inline-block;}
.w-icon img {width: 100%;height: 100%}`
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

function formatWidget(props: Widget1ViewModel) {
  const {
    place,
    lang,
    links,
    w,
    locales,
    days,
    htcolor,
    report,
    bcolor,
    bkcolor,
    hbkcolor,
    config
  } = props;
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

  if (w < 190) {
    title = placename;
  }

  const name =
    '<a target="_blank" style="color:#' +
    htcolor +
    ';" href="' +
    url +
    '" title="' +
    longtitle +
    '">' +
    title +
    "</a>";

  let body = "";

  const timezone = !!moment.tz.zone(place.timezone)
    ? place.timezone
    : config.timezone;

  for (var i = 0; i < days && i < report.data.length; i++) {
    const day = report.data[i],
      symbolName = WeatherHelpers.iconName(day.icon, lang),
      temperature =
        Math.round(day.temperatureHigh || day.temperature) +
        "&deg; | " +
        Math.round(day.temperatureLow || day.temperature) +
        "&deg;",
      date = moment(new Date(day.time * 1000))
        .tz(timezone)
        .locale(lang);

    const line =
      '<div class="line"><table width="100%" border="0" cellspacing="0"><tr><td class="day"><div class="name">' +
      date.format("dd") +
      '</div><div class="date">' +
      date.format("D MMM") +
      '</div></td><td class="icon"><span class="w-icon wi-' +
      day.icon +
      '" title="' +
      symbolName +
      '"><img alt="' +
      title +
      '" src="' +
      WeatherHelpers.iconUrl(day.icon) +
      '" /></span></td><td class="details"><div class="temp">' +
      temperature +
      '</div><div class="name" title="' +
      symbolName +
      '">' +
      symbolName +
      "</div></td></tr></table></div>";
    body += line;
  }

  var headstyle = "border:1px solid #" + bcolor + ";background:#" + hbkcolor;
  var bodystyle =
    "cursor:pointer;border:1px solid #" +
    bcolor +
    ";border-top:0px;background:#" +
    bkcolor;

  const div = util.format(
    '<div id="widget"><div class="head" style="%s">%s</div><div onclick="window.open(\'%s\', \'_blank\');" class="body" style="%s">%s</div></div>',
    headstyle,
    name,
    url,
    bodystyle,
    body
  );

  return div + coinWebData.buildJS();
}
