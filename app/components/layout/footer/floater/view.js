define([
  "jquery",
  "underscore",
  "backbone.marionette",
  "app",
  "helpers/ui",
  "components/layout/footer/floater/scroll"
], function($, _, Marionette, app, ui, scroll) {

  var FloaterView = Marionette.ItemView.extend({
    className: "floater-footer",
    template: "components/layout/footer/floater/view",
    events: {
      "click #floater-menu": "menu",
      "click #floater-contact": "contact"
    },

    onRender: function() {
      scroll.start(this.$el);
    },

    menu: function() {
      var navToggle = $(".nav-toggle");
      if (navToggle.length > 0) {
        ui.scrollTopConditional(navToggle.offset());
        navToggle.click();
      }
    },
    contact: function() {
      var formName = $("#form-name");
      if (formName.length > 0) {
        _.defer(function(name){ name.focus(); }, formName);
      }
    }
  });

  return {
    create: function() {
      var req = app.request("content:entity", { object_type: "business" });
      var view = new FloaterView(req.entity);
      view.entity = view.model || view.collection;
      return view;
    }
  };
});