window.$ = require("cash-dom");
require("../news/lazy");
require("./forecast-browser");
require("./widget-config");
require("../base/subscribe-box");
const adsenseLoader = require("../base/adsense-loader");

new window.LazyLoad({
  elements_selector: ".o-lazy-noext",
  to_webp: false
});

new adsenseLoader('.adsense');
