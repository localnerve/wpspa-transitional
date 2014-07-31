define([
  "backbone.marionette",
  "app",
  "helpers/routes",
  "components/layout/content-header/navigation/item"
], function(Marionette, app, routes, itemView) {

  var NavigationView = Marionette.CompositeView.extend({
    template: "components/layout/content-header/navigation/view",
    itemView: itemView,
    tagName: "nav",
    itemViewContainer: ".nav-bar",
    attributes: {
      role: "navigation",
      "aria-label": "Site Navigation"
    },

    initialize: function() {
      var self = this;      
      this.listenTo(app.vent, "content:start", function(options) {
        self.onContentStart(options);
      });
    },
    onContentStart: function(options) {
      routes.nav.contentStart(this.$itemViewContainer, options);
    }
  });

  return {
    create: function() {
      var req = app.request("content:entity", { object_type: "navigation" });
      var view = new NavigationView(req.entity);
      view.entity = view.model || view.collection;
      return view;      
    }
  };

});