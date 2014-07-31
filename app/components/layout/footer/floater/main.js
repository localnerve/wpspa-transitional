/*
 * footer floater main
 */
define([
  "app",
  "components/layout/footer/floater/view"
], function(app, floaterView) {
  var thisModule = app.module("container.footer", function(footer) {

    footer.addFinalizer(function() {
      if (footer.footerFloater)
        delete footer.footerFloater;
    });

    this.listenTo(footer, "footer:data:ready", function() {
      footer.footerFloater = floaterView.create();
    });
  });

  return thisModule;
});