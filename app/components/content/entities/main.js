define([
  "helpers/contract",
  "helpers/types",
  "components/content/entities/model",
  "components/content/entities/specializations/main"
],
function(contract, types, DefaultType, specializations) {

  function createDefaultType(type, options) {
    return new DefaultType.create(
      type === "empty" ? { createdEmpty: true } : options
    );
  }

  function createSpecialization(type, options) {
    var result;
    if (specializations[type]) {
      result = specializations[type].createEntity(options);
    }
    return result;
  }

  function create(options) {
    contract(options, "object_type");

    var type = types.baseObjectType(options.object_type);

    return createSpecialization(type, options) || createDefaultType(type, options);
  }

  return {
    create: create
  };
});