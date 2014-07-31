/**
 * Foundation
 * Using super old Foundation 3.2.5 to support IE8 commercial customers.
 * Every component gets attached to jquery function proto globally.
 *
 * Webshim
 * Dynamically load webshim, if required per Modernizr tests.
 */
define([
  "jquery",
  "require",
  "module",
  "app",
  "foundation/init",
  "foundation/jquery.foundation.navigation.ln",
  "foundation/jquery.foundation.orbit.ln",
  "foundation/jquery.foundation.reveal"  
], function($, require, module, app, foundationInit) {
  var $m = window.Modernizr;  
  var vendorInit = false;

  function polyfill() {
    if (!$m.input || !$m.inputtypes || !$m.formvalidation) {
      require(["polyfiller"], function() {
        var features = ["forms"];

        $.webshims.setOptions({
            waitReady: false,
            disableShivMethods: false,
            basePath: module.config().polyfillerBasePath
          });
        
        // start polyfilling        
        $.webshims.polyfill(features.join(" "));
        
        $(function() {
          $.webshims.ready(features.join(" ") + " DOM", function() {
            app.trigger("polyfill:ready");
          });
        });
      });
    } else {
      app.trigger("polyfill:ready");
    }
  }

  return {
    initialize: function() {
      if (!vendorInit) {        
        vendorInit = true;
        
        foundationInit.initialize();
        
        polyfill();
      }
    }    
  };

});
