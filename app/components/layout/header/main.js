define([
  "underscore",
  "backbone.marionette",
  "app",
  "module",
  "components/layout/header/ribbon/main"
], function(_, Marionette, app, module) {

  var thisModule = app.module("container.header", function(header) {

    var HeaderLayout = Marionette.Layout.extend({
      template: "components/layout/header/template",
      className: "site-header",
      regions: {
        ribbon: "#ribbon"
      },
      onRender: function() {
        header.ribbon.trigger("ribbon:show");
      }
    });

    header.addInitializer(function(options) {
      this.layout = new HeaderLayout(options);
      this.timeout = module.config().timeout;

      this.listenTo(this.ribbon, "ribbon:show", _.after(module.config().ribbonShowEvents, function() {
        this.layout.ribbon.show(this.ribbon);
      }));
    });

    header.addFinalizer(function() {
      delete this.layout;
    });

  });

  return thisModule;

});