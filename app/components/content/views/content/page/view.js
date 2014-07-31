/*
 * PageView
 */
define([
  "backbone",
  "backbone.marionette",
  "components/content/entities/helpers",
  "components/content/views/content/page/content/view",
  "components/content/views/content/page/contact/view",
  "components/content/views/content/page/social/view"
], function(Backbone, Marionette, helpers, content, contact, social) {

  var PageView = Marionette.Layout.extend({
    template: "components/content/views/content/page/view",
    className: "grid-row",

    regions: {
      content: "#post-content",
      sidebar: "#post-sidebar",
      social: "#post-social"
    },
    
    onRender: function() {
      var slug = this.model.get("slug");
      if (slug !== "contact") {
        this.content.show(content.create({
          model: new Backbone.Model(helpers.findPostByQualifiedSlug(this.model, "content"))
        }));
        this.sidebar.show(contact.create({
          model: new Backbone.Model(helpers.findPostByQualifiedSlug(this.model, "sidebar"))
        }));
        if (slug === "home") {
          this.social.show(social.create());
        }
      } else {
        this.content.show(contact.create({
          model: new Backbone.Model(helpers.findPostByQualifiedSlug(this.model, "content")),
          params: { focus: true }
        }));
      }
    },

    onTransitionOpenBefore: function() {
      this.$el.hide();
    },
    onTransitionOpenAfter: function(options) {
      var transitionClass = "single-page-fade-in";
      if (options.view.transition) {
        transitionClass = options.view.transition;
        options.view.transition = null;
      }
      this.$el.addClass(transitionClass);
      this.$el.show();
    }
  });

  return {
    create: function(options) {
      return new PageView(options);
    }
  };
});