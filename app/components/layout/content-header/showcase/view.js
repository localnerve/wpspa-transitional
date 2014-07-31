define([
  "jquery",
  "backbone",
  "backbone.marionette",
  "app",
  "helpers/urls",
  "components/content/entities/helpers",
  "components/layout/content-header/showcase/evidence/view",
  "components/layout/content-header/showcase/slider/view"
], function($, Backbone, Marionette, app, urls, helpers, evidenceView, sliderView) {

  var $tmp = $("<div class='js-splash-logo' />").appendTo("body");
  var logoUrl = urls.getBackgroundImageUrl($tmp);
  $tmp.remove().empty();

  var ShowcaseLayout = Marionette.Layout.extend({
    template: "components/layout/content-header/showcase/view",
    className: "showcase",
    regions: {
      evidence: "#evidence",
      slider: "#slider"
    },
    ui: {
      logo: ".logo-img"
    },
    initialize: function() {
      var self = this;
      this.listenTo(app.vent, "content:start:success", function(options) {
        self.onContentSuccess(options);
      });
    },
    onRender: function() {      
      this.ui.logo.attr("src", logoUrl);
    },
    onContentSuccess: function(options) {
      this.evidence.show(evidenceView.create({
        model: new Backbone.Model(helpers.findCategoryArrayBySlug(options.model, "evidence"))
      }));
      this.slider.show(sliderView.create({
        model: new Backbone.Model(helpers.findCategoryArrayBySlug(options.model, "slider"))
      }));
    }
  });

  return {
    create: function() {
      return new ShowcaseLayout();
    }
  };
});