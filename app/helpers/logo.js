/*
 * logo.js
 *
 * Simple helper methods to work on the logo.
 */
define([
  "jquery",
  "helpers/urls"
], function($, urls) {

  var logoUrl;

  // Get the background-image associated with js-splash-logo
  function getLogoUrl() {
    var $tmp = $("<div class='js-splash-logo' />").appendTo("body");
    logoUrl = urls.getBackgroundImageUrl($tmp);
    $tmp.remove().empty();    
  }

  // on DOM is ready, the css will be parsed, so we can get the background-image property.
  $(getLogoUrl);

  return {
    // This will be undefined if called before DOM ready
    logoUrl: logoUrl
  };  
});
