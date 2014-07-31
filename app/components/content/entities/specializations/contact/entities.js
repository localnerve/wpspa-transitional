define([
  "jquery",
  "backbone",
  "helpers/urls",
  "module"
], function($, Backbone, urls, module) {

  var ContactModel = Backbone.Model.extend({

    urlRoot: module.config().urlRoot,

    url: function() {
      return urls.normalizeUrlRoot(this.urlRoot) + "?" +
        $.param(this.attributes);
    }
  });

  return ContactModel;
});