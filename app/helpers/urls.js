/*
 * urls.js
 *
 * Simple helper methods to work on urls.
 */
define(function() {

  /**
   * Get the url from a background image
   */
  function getBackgroundImageUrl($el) {
    return $el.css("background-image").replace(/(^\s*url\(\s*(?:"|')?)([^"'\)]+)((?:"|')?\s*\)\s*$)/i, function(m, c1, c2, c3) {
        return c2;
    });
  }

  // Ensure a url root is well formed and ok to add on to
  function normalizeUrlRoot(urlRoot) {
    urlRoot = urlRoot.replace(/^\/|\/$/g, "") + "/";
    if (!/^https?:\/\//.test(urlRoot))
      urlRoot = "/"+urlRoot;
    return urlRoot;
  }

  return {
    normalizeUrlRoot: normalizeUrlRoot,
    getBackgroundImageUrl: getBackgroundImageUrl
  };

});