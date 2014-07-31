define([
  "underscore",
  "backbone.marionette",
  "app",
  "module",
  "components/vendor-interface",
  "components/layout/content/main",
  "components/layout/content-header/main",
  "components/layout/off-canvas/main",
  "components/layout/header/main",  
  "components/layout/footer/main"
], function(_, Marionette, app, module, vendor, content) {

  var thisModule = app.module("container", function(container) {

    var AppLayout = Marionette.Layout.extend({
      template: "components/layout/template",
      className: "grid-row",

      regions: {
        header: "#header",
        footer: "#footer",
        contentHeader: "#content-header",
        offCanvas: "#off-canvas",
        content: content
      },

      onRender: function() {
        vendor.initialize();
        app.container.trigger("container:afterVendorInitialize", vendor);
        
        this.header.show(container.header.layout);
        this.contentHeader.show(container.header.contentHeader);
        this.offCanvas.show(container.offCanvas);
        this.footer.show(container.footer.layout);
        // content is shown dynamically and shows itself on routing events
      }
    });

    // Extend the container object
    _.extend(container, {
      startRouting: function() {
        app.vent.trigger("app:startRoutes");
      },
      // after N container:complete events, start application routing
      completions: module.config().containerCompletions
    });

    container.addInitializer(function(options) {
      this.layout = new AppLayout(options);

      this.listenTo(app.vent, "container:complete", _.after(container.completions, function() {
        container.startRouting();
        container.stopListening();
      }));

      this.header.trigger("container:ready");
      this.footer.trigger("container:ready");
    });

    container.addFinalizer(function() {
      this.stopListening();
      delete this.layout;
    });

  });

  return thisModule;

});