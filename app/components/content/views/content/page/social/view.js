define([
  "jquery",
  "backbone.marionette",
  "helpers/fb"
], function($, Marionette, fb) {
  // window.twttr is a global dependency
  // document is a global dependency

  // slightly modified twitter widget load script
  //  Differences:
  //    async = true
  //    If fb is not loaded, don't load this either
  function twitterLoad(d) {
    var js, fjs, p = /^http:/.test(d.location)?"http":"https", s = "script", id = "twitter-wjs";
    if (fb) {
      if (!d.getElementById(id)) {
        fjs=d.getElementsByTagName(s)[0];
        js=d.createElement(s);
        js.async=true;
        js.id=id;
        js.src=p+"://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js,fjs);
      }
    }
  }

  var SocialView = Marionette.ItemView.extend({
    className: "page-social",
    template: "components/content/views/content/page/social/view",
    onRender: function() {
      var viewEl = this.$el[0];
      if (!fb) {
        this.$(".social-panel").removeClass("hide").addClass("hide");
      }
      $(function() {
        if (fb) {
          fb.XFBML.parse(viewEl);
          if (window.twttr) {
            window.twttr.widgets.load(viewEl);
          }
        }
      });      
    }
  });

  return {
    create: function() {
      twitterLoad(document);
      return new SocialView();
    }
  };
});