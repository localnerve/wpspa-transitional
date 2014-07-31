define([
  "helpers/routes",
  "app",
  "components/layout/content-header/navigation/routes",
  "components/layout/content-header/navigation/view"
], function(routes, app, navigationRoutes, navigationView) {

  // Create a partial definition for container.header module
  var thisModule = app.module("container.header", function(header) {

    // add another header module initializer
    header.addInitializer(function() {
      this.navigation = navigationView.create();
    });

    // add a finalizer to the container.header module 
    header.addFinalizer(function() {
      delete this.navigation;
    });

    // After app initialization, update routing and start the download
    app.on("initialize:after", function() {

      header.navigation.entity.fetch({
        timeout: header.timeout,

        success: function(collection) {
          navigationRoutes.addRoutes(collection);
          app.vent.trigger("container:complete");
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

  return thisModule;
});