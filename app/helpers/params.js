/**
 * params.js
 *
 * Helper methods and objects for request parameters
 */
define([
  "underscore",
  "helpers/types",
  "module"
], function(_, types, module) {
  
  // Standard meta parameters for a request
  var meta = {
    custom_fields: module.config().customFieldsParam
  };

  // Methods for creating params for fetching WP posts for a collection
  var collection = {
    id: function(id) {
      return "id="+encodeURIComponent(id);
    },
    slug: function(names) {
      if (names.length > 1) throw new Error("WP Query does not support multiple slugs");
      return "name="+encodeURIComponent(names[0]);
    }
  };

  // Create a typed id
  function typedId(id, uri) {
    var result = {};
    if (uri)
      result[types.objectIdType(id)] = encodeURIComponent(id);
    else
      result[types.objectIdType(id)] = parseInt(id, 10) || id;
    return result;
  }

  return {
    meta: meta,
    collection: collection,
    typedId: typedId
  };
});