/**
 * A collection of methods to assist dealing with types
 */
define(function() {

  // Get the base object type from object_type
  function baseObjectType(object_type) {
    return object_type.split(":")[0];
  }

  // Get the specific object type from object_type
  function specificObjectType(object_type) {
    return object_type.split(":")[1];
  }

  // Produce a selector name from an object_id
  function objectIdType(id) {
    return parseInt(id, 10) ? "id" : "slug";
  }

  function makeObjectType(base, specific) {
    return base + ":" + specific;
  }

  return {
    baseObjectType: baseObjectType,
    specificObjectType: specificObjectType,
    makeObjectType: makeObjectType,
    objectIdType: objectIdType
  };
});