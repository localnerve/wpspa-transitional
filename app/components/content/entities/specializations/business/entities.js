define([
  "backbone",
  "helpers/backbone/sync",
  "components/content/entities/specializations/business/parser",
  "module"
], function(Backbone, sync, parser, module) {
  var $w = window;

  // definition of the business entity
  var BusinessEntity = Backbone.Model.extend({
    // get endpoint from config
    url: module.config().endpoint,

    // override sync, if injected data not here, delegate to Backbone
    sync: sync($w.wpspa ? $w.wpspa.business : null),

    // delegate response parsing to the given parser
    parse: function(data) {
      return parser(data);
    }
  });

  return {
    createEntity: function() {
      return {
        model: new BusinessEntity()
      };
    }
  };

});
