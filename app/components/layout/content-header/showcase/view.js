define([
  "backbone",
  "backbone.marionette",
  "app",
  "helpers/logo",
  "components/content/entities/helpers",
  "components/layout/content-header/showcase/evidence/view",
  "components/layout/content-header/showcase/slider/view"
], function(Backbone, Marionette, app, logo, helpers, evidenceView, sliderView) {

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
      var self = this;
      logo.getLogoUrl(function(logoUrl) {
        self.ui.logo.attr("src", logoUrl);
      });
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