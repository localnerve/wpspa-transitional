/*
 * showcase
 * Shows the slider/logo area of the site
 */
define([
  "backbone.marionette",
  "app",
  "components/layout/content-header/showcase/view"  
], function(Marionette, app, showcaseView) {

  // Create a partial definition for container.header module
  var thisModule = app.module("container.header", function(header) {

    // add another header module initializer
    header.addInitializer(function() {
      this.showcase = showcaseView.create();
    });

    header.addFinalizer(function() {
      delete this.showcase;
    });

  });

  return thisModule;
});