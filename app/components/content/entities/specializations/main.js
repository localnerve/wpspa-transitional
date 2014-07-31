/*
 * specializations/main
 *
 * Special relationship enitites module loader
 */
define([
  "components/content/entities/specializations/business/entities",
  "components/content/entities/specializations/navigation/entities"
], function(business, navigation) {
  return {
    business: business,
    navigation: navigation
  };
});