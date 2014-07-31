define([
  "backbone.marionette",
  "helpers/routes"
], function(Marionette, routes) {

  // The view definition of each navigation item
  var NavItemView = Marionette.ItemView.extend({
    template: "components/layout/content-header/navigation/item",
    tagName: "li",

    initialize: function() {
      routes.nav.hide(this.$el, this.model.get("route"));
    },    
    serializeData: function() {
      return {
        name: this.model.get("name"),
        href: routes.routeToHref(this.model.get("route")),
        navItem: this.model.get("nav_item")
      };
    }
  });

  return NavItemView;
});