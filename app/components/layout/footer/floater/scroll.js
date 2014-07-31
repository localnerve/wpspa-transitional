/**
 * Scroll Loop for the footer floater
 *  Scroll tips from: https://gist.github.com/Warry/4254579
 */
define([
  "app",
  "module"
], function(app, module) {

  // global references
  var W = window,
      M = window.Modernizr;  

  // the class that controls floater show
  var floaterShow = "floater-footer-show";

  var scroll = W.requestAnimationFrame ||
        W.webkitRequestAnimationFrame ||
        W.mozRequestAnimationFrame ||
        W.msRequestAnimationFrame ||
        W.oRequestAnimationFrame ||
        // IE Fallback
        function(callback){ W.setTimeout(callback, 1000/60); };

  // cache the media query that determines if the footer floater is active
  var activeMediaQuery = module.config().activeMediaQuery;

  var $element, menuActive, started, lastPosition = -1;

  /** 
   * Toggle the state of the footer floater
   */
   function floaterState(show) {
    if (started) {
      $element.removeClass(floaterShow);
      if (show) $element.addClass(floaterShow);
    }
    return show;
   }

  /**
   * Determine if the scrolling footer floater is active.
   * 
   * If not active, make floater is hidden.
   */
  function active() {
    return (M.mq(activeMediaQuery) && !menuActive) || floaterState(false);
  }

  /**
   * A loop iteration
   */
  function loop() {
    if (lastPosition == W.pageYOffset || !active()) {
      scroll(loop);
      return false;
    } else {
      if (lastPosition < W.pageYOffset || W.pageYOffset < 50) {
        floaterState(false);
      } else {
        floaterState(true);
      }
      lastPosition = W.pageYOffset;
      scroll(loop);
    }
  }

  /**
   * Start the loop
   */
  function start($el) {
    if (!started) {
      $element = $el;
      loop();
      started = true;
    }
  }

  // hide the floating footer on content start
  app.vent.on("content:start", function() {
    floaterState(false);
  });

  // record the state of the menu
  app.vent.on("nav:toggle:active", function() {
    menuActive = true;
  });
  app.vent.on("nav:toggle:inactive", function() {
    menuActive = false;
    floaterState(false);
  });

  return {
    start: start
  };
});