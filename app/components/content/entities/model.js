define([
  "jquery",
  "backbone",
  "helpers/contract",
  "helpers/backbone/sync",
  "helpers/urls",
  "helpers/types",
  "helpers/params",
  "module",
  "components/content/entities/helpers"
], function($, Backbone, contract, sync, urls, types, params, module, helpers) {
  var $w = window;

  var PageModel = Backbone.Model.extend({

    urlRoot: module.config().urlRoot,

    initialize: function(attr, options) {
      // make sure this object was created as expected
      contract(options, "items.0.object_id");

      this.options = options;

      // dynamic sync
      var name = types.specificObjectType(options.object_type).toLowerCase();
      this.sync = sync($w.wpspa[name]);
    },

    url: function() {
      return urls.normalizeUrlRoot(this.urlRoot) +
             "?post_type=any" +
             "&"+ $.param(params.typedId(this.options.items[0].object_id, true)) +
             "&"+ params.meta.custom_fields;
    },

    parse: function(data) {
      return helpers.parse(data);
    }
  });

  return {
    create: function(options) {
      return new PageModel({}, options);
    }
  };
});