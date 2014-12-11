define([
  "underscore",
  "jquery",
  "backbone.marionette",
  "app",
  "helpers/routes",
  "helpers/logo",
  "components/layout/content-header/navigation/item",
  "components/layout/off-canvas/navigation-indicator/main"
], function(_, $, Marionette, app, routes, logo, itemView) {

  var OffCanvasView = Marionette.CompositeView.extend({
    template: "components/layout/off-canvas/view",
    className: "off-canvas",

    // places in the DOM we rely on
    toggleAttach: "#off-canvas",
    classAttach: "active-off-canvas",
    timerResume: 300, //ms, transition is 250ms
    timer: ".timer",
    timerPaused: ".timer .pause.active",

    itemView: itemView,
    itemViewContainer: ".nav-bar",
    events: {
      "click .nav-toggle": "toggle"
    },
    ui: {
      navIndicator: ".nav-indicator-area",
      logoStar: ".logo-star"
    },
    initialize: function() {
      this.listenTo(app.vent, "content:start", this.onContentStart);
    },
    onRender: function() {
      var self = this;
      logo.getLogoUrl(function(logoUrl) {
        self.ui.logoStar.attr("src", logoUrl);
      });
      this.$el.off("swipeleft").on("swipeleft", _.bind(this.closeNav, this));
    },
    onClose: function() {
      this.ui.navToggle.off("swipeleft");
    },
    onContentStart: function(options) {
      routes.nav.contentStart(this.$itemViewContainer, options);
      this.closeNav();
    },
    closeNav: function() {
      if ($(this.toggleAttach).hasClass(this.classAttach)) {
        this.toggle();
      }
    },
    toggle: function() {      
      var active = $(this.toggleAttach).hasClass(this.classAttach);
      var paused = ($(this.timerPaused).length > 0);
      
      app.vent.trigger("nav:toggle:"+(active ? "inactive" : "active"), { 
        navIndicator: this.ui.navIndicator
      });

      // currently NOT offcanvas and NOT paused, so pause right now
      if (!active && !paused) {
        $(this.timer).click();
      }

      $(this.toggleAttach).toggleClass(this.classAttach);      

      // currently offcanvas, resume after transition if paused
      if (active && paused) {
        _.delay(function(self) {
          // this is required, because if it is a new page, it is a different pause state
          var paused = ($(self.timerPaused).length > 0);
          if (paused) {
            $(self.timer).click();
          }
        }, parseInt(this.timerResume, 10), this);
      }
    }    
  });  

  return {
    create: function() {
      var req = app.request("content:entity", { object_type: "navigation" });
      var view = new OffCanvasView(req.entity);
      view.entity = view.model || view.collection;
      return view;      
    }
  };
});