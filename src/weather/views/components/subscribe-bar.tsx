
import * as React from 'react';
import { Place } from '@ournet/api-client';
import { WeatherAppConfig } from '../../config';
import { getPlaceName } from '../../../helpers';
import { OurnetLocales } from '../../../locales';

export type SubscribeBarProps = {
  locales: OurnetLocales
  place: Place
  config: WeatherAppConfig
  lang: string
}

export function SubscribeBar({ locales, config, lang, place }: SubscribeBarProps) {

  if (!config.oneSignal) {
    return null;
  }

  return (
    <div key={`substribe-bar-${Math.random().toString().substring(0, 10)}`}>
      <div className="c-subscribe-bar u-hidden js-subscribe-box o-lazy-noext" data-src="https://c2.staticflickr.com/8/7724/26987380802_dc156534d3_z.jpg" data-category='notifications-weather' data-tags={JSON.stringify({ 'place-id': place.id, 'admin1-code': place.admin1Code })}>
        <div className="c-subscribe-bar__btn">{locales.weather_notifications_subscribe_for_place_format({ name: getPlaceName(place, lang) })}</div>
      </div>
      <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async></script>
      <script dangerouslySetInnerHTML={{
        __html: `var OneSignal = window.OneSignal || [];
OneSignal.push(['init', {
  appId: "${config.oneSignal.appId}",
  autoRegister: false,
  persistNotification: false,
  notifyButton: {
    enable: true,
    showCredit: false,
    prenotify: true
  },
  welcomeNotification: {
    disable: true
  },
  safari_web_id: "${config.oneSignal.safari_web_id}"
}]);`}}></script>
    </div>
  )
}
