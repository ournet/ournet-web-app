var LazyLoad = require("vanilla-lazyload");
window.LazyLoad = LazyLoad;

new LazyLoad({
  elements_selector: ".o-lazy",
  to_webp: true
});
