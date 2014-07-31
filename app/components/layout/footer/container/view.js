define([
  "backbone.marionette",
  "app"
  ], function(Marionette, app) {

  // The definition of the FooterView
  var FooterView = Marionette.ItemView.extend({
    className: "footer-area",
    template: "components/layout/footer/container/view"    
  });

  return {
    create: function() {
      var req = app.request("content:entity", { object_type: "business" });
      var view = new FooterView(req.entity);
      view.entity = view.model || view.collection;
      return view;
    }
  };
});