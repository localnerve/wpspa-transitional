/*
 * footerContainer
 * Defines the footer container
 */
define([
  "app",
  "module",
  "components/layout/footer/container/view"
], function(app, module, footerView) {

  // Create a partial definition for container.footer module
  var thisModule = app.module("container.footer", function(footer) {

    // add another footer module initializer
    footer.addInitializer(function() {
      this.footerContainer = footerView.create();
      this.timeout = module.config().timeout;
    });

    footer.addFinalizer(function() {
      delete this.footerContainer;
    });

    this.listenTo(footer, "container:ready", function() {
      footer.footerContainer.entity.fetch({
        timeout: footer.timeout,

        success: function() {
          app.vent.trigger("container:complete");
          footer.trigger("footer:data:ready");
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