define([
  "backbone",
  "helpers/backbone/sync",
  "components/content/entities/specializations/navigation/parser",
  "module"
], function(Backbone, sync, parser, module) {
  var $w = window;

  var NavigationEntity = Backbone.Collection.extend({
    url: module.config().endpoint,

    // override sync, if injected data not here, delegate to Backbone
    sync: sync($w.wpspa ? $w.wpspa.navigation : null),

    parse: function(data) {
      return parser(data);
    }
  });

  return {
    createEntity: function() {
      return {
        collection: new NavigationEntity()
      };
    }
  };  

});
