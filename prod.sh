#!/bin/bash

yarn unlink @ournet/domain
yarn unlink @ournet/api-client
yarn unlink @ournet/weather-domain
yarn unlink @ournet/places-domain
yarn unlink @ournet/images-domain
yarn unlink @ournet/horoscopes-domain
yarn unlink @ournet/news-domain
yarn unlink @ournet/topics-domain
yarn unlink ournet.links

yarn add @ournet/domain
yarn add @ournet/api-client
yarn add @ournet/weather-domain
yarn add @ournet/places-domain
yarn add @ournet/images-domain
yarn add @ournet/horoscopes-domain
yarn add @ournet/news-domain
yarn add @ournet/topics-domain
yarn add ournet.links

yarn test
