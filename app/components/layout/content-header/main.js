define([
  "backbone.marionette",
  "app",
  "components/layout/content-header/showcase/main",
  "components/layout/content-header/navigation/main"
], function(Marionette, app) {

  var thisModule = app.module("container.header", function(header) {

    var ContentHeader = Marionette.Layout.extend({
      template: "components/layout/content-header/template",
      className: "content-header",
      regions: {
        showcase: "#showcase",
        navigation: "#navigation"
      },
      onRender: function() {
        this.showcase.show(header.showcase);
        this.navigation.show(header.navigation);
      }
    });

    header.addInitializer(function(options) {
      this.contentHeader = new ContentHeader(options);
    });

    header.addFinalizer(function() {
      delete this.contentHeader;
    });

  });

  return thisModule;

});