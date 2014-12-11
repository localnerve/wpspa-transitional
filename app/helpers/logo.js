/*
 * logo.js
 *
 * Simple helper methods to work on the logo.
 */
define([
  "jquery",
  "helpers/urls"
], function($, urls) {  

  // Get the background-image associated with js-splash-logo
  function getLogoUrlFromDOM() {
    var $tmp = $("<div class='js-splash-logo' />").appendTo("body");
    var logoUrl = urls.getBackgroundImageUrl($tmp);
    $tmp.remove().empty();
    return logoUrl;
  }

  // on DOM is ready, the css will be parsed, so we can get the background-image property.
  function getLogoUrl(callback) {
    $(function() {
      callback(getLogoUrlFromDOM());
    });
  }

  return {
    // This will be undefined if called before DOM ready
    getLogoUrl: getLogoUrl
  };  
});
