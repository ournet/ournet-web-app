window.$ = require("cash-dom");
require("../news/lazy");
require("./forecast-browser");
require("./widget-config");
require("../base/subscribe-box");

new window.LazyLoad({
  elements_selector: ".o-lazy-noext",
  to_webp: false
});
