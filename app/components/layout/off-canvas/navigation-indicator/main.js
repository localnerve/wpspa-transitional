//
// Toggle handler for .nav-indicator-area
//
define([
  "app"
], function(app) {

  function handler(params) {
    var $el = params.navIndicator;

    if (!$el.hasClass('in')) {
      $el.addClass('in');
    } else {
      $el.removeClass('in')
             .addClass('out')
             .delay(500)
             .queue(function(next) {
               $el.addClass('no-trans').removeClass('out');
               next();
             });
    }

    $el.delay(500).queue(function(next) {
      $el.removeClass('no-trans');
      next();
    });
  }

  app.vent.on("nav:toggle:active", handler);
  app.vent.on("nav:toggle:inactive", handler);

});