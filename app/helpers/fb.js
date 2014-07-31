define([
  "module",
  "facebook"
], function(module) {
  var fb = null;
  if (typeof FB != "undefined") {
    FB.init(module.config());
    fb = FB;
  }
  return fb;
});