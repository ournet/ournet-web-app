
import * as React from 'react';
import { Place } from '@ournet/api-client';
import { TranslateFunction } from '../../../ournet/locale';
import { WeatherAppConfig } from '../../config';
import { WeatherLocaleNames } from '../../locale';
import { getPlaceName } from '../../../helpers';

export type SubscribeBarProps = {
  translate: TranslateFunction
  place: Place
  config: WeatherAppConfig
  lang: string
}

export function SubscribeBar({ translate, config, lang, place }: SubscribeBarProps) {

  if (!config.oneSignal) {
    return null;
  }

  return (
    <div>
      <div className="c-subscribe-bar u-hidden" data-place-id={place.id} data-admin1-code={place.admin1Code}>
        <div className="c-subscribe-bar__btn">{translate(WeatherLocaleNames.notifications_subscribe_for_place, { name: getPlaceName(place, lang) })}</div>
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
