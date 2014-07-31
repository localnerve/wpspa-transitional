define([
  "underscore",
  "backbone.marionette",
  "components/layout/content-header/showcase/slider/vendor"
], function(_, Marionette, slider) {

  var SliderView = Marionette.ItemView.extend({    
    template: "components/layout/content-header/showcase/slider/view",
    className: "slider-container",
    serializeData: function() {
      return {
        sliderId: slider.sliderId
      };
    },
    onRender: function() {
      var sliderData = _.sortBy(this.entity.get("attachments"), "slug");
      
      var links = this.entity.get("custom_fields") && this.entity.get("custom_fields").links;      
      if (links) {
        links = JSON.parse(_.first(links));
      }

      slider.render(this.$el, sliderData, links);
    }
  });

  return {
    create: function(options) {
      var view = new SliderView(options);
      view.entity = view.model || view.collection;
      return view;
    }
  };
});