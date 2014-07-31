/*
 * ribbon
 * The top bar of the site
 */
define([
  "app",
  "components/layout/header/ribbon/view"
], function(app, ribbonView) {

  // Create a partial definition for container.header module
  var thisModule = app.module("container.header", function(header) {

    // add another header module initializer
    header.addInitializer(function() {
      this.ribbon = ribbonView.create();
    });

    header.addFinalizer(function() {
      delete this.ribbon;
    });

    this.listenTo(header, "container:ready", function() {
      header.ribbon.entity.fetch({
        timeout: header.timeout,

        success: function() {
          app.vent.trigger("container:complete");
          header.ribbon.trigger("ribbon:show");
        },

        error: function(collection, response, options) {
          app.vent.trigger("app:error", {
            collection: collection,
            response: response,
            options: options
          });
        }
      });      
    });
  });
});