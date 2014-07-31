define([
  "jquery",
  "backbone.marionette",
  "helpers/fb",
  "app"
], function($, Marionette, fb, app) {
    
  // The definition of the Ribbon view
  var RibbonView = Marionette.ItemView.extend({
    template: "components/layout/header/ribbon/view",
    className: "ribbon",
    attributes: {
      role: "ribbon"
    },
    onRender: function() {
      var viewEl = this.$el[0];
      $(function() {
        if (fb) {
          fb.XFBML.parse(viewEl);
        }
      });
    }
  });

  return {
    create: function() {
      var req = app.request("content:entity", { object_type: "business" });
      var view = new RibbonView(req.entity);
      view.entity = view.model || view.collection;
      return view;      
    }
  };
});