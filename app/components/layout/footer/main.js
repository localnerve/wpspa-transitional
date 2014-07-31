/*
 * container.footer
 * Defines the container.footer submodule and layout
 */
define([
  "backbone.marionette",
  "app",
  "components/layout/footer/container/main",
  "components/layout/footer/siteInfo/main",
  "components/layout/footer/floater/main"
], function(Marionette, app) {

  // Create a partial definition for container.footer
  var thisModule = app.module("container.footer", function(footer) {

    // Definition of the Footer Layout.
    var FooterLayout = Marionette.Layout.extend({
      template: "components/layout/footer/template",
      className: "site-footer",

      regions: {
        footerContainer: ".footer-container",
        siteInfo: ".site-info",
        floaterContainer: ".floater-container"
      },

      onRender: function() {
        this.footerContainer.show(footer.footerContainer);
        this.siteInfo.show(footer.siteInfo);
        
        this.floaterContainer.show(footer.footerFloater);
      }
    });

    footer.addInitializer(function(options) {
      this.layout = new FooterLayout(options);
    });

    footer.addFinalizer(function() {
      delete this.layout;
    });

  });

});