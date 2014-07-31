define([
  "backbone.marionette",
  "app",
  "components/layout/off-canvas/view"
], function(Marionette, app, offCanvasView) {

  var thisModule = app.module("container", function(container) {

    container.addInitializer(function() {
      this.offCanvas = offCanvasView.create();
    });

    container.addFinalizer(function() {
      delete this.offCanvas;
    });

  });

  return thisModule;

});