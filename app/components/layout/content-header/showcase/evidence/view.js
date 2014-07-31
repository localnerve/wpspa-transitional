define([
  "backbone.marionette"
], function(Marionette) {

  var EvidenceView = Marionette.ItemView.extend({    
    template: "components/layout/content-header/showcase/evidence/view",
    className: "evidence",
    serializeData: function() {
      return {
        content: this.entity.get("content")
      };
    }
  });

  return {
    create: function(options) {
      var view = new EvidenceView(options);
      view.entity = view.model || view.collection;
      return view;
    }
  };
});