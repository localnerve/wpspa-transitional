define([
  "backbone.marionette"
], function(Marionette) {

  var ContentView = Marionette.ItemView.extend({
    template: "components/content/views/content/page/content/view",
    className: "page-content",

    serializeData: function() {
      return {
        content: this.model.get("content")
      };
    }
  });

  return {
    create: function(options) {
      return new ContentView(options);
    }
  };
});