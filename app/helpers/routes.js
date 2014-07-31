/**
 * routes.js
 *
 * Helper methods to assist with routes.
 */
define([
  "underscore",
  "module"
], function(_, module) {

  /**
   * nav route helpers
   */
  var nav = {
    contentStart: function($el, options) {
      // if this is content we respond to
      if (typeof options.route !== "undefined") {
        // clear anything marked active
        $el.find(".active").removeClass("active");

        // get the anchor we are targeting and mark it active
        var href = routeToHref(options.route);
        var item = $el.find("a[href='"+href+"']");
        item.parent().addClass("active");
        
        // also mark any parent anchors up the tree as active
        var parentAnchors = item.parents("ul").siblings("a").first();
        if (parentAnchors.length > 0)
          parentAnchors.parent().addClass("active");
      }      
    },
    hide: function($el, route) {
      if (_.contains(module.config().hide, route)) {
        $el.css("display", "none");
      }
    }
  };

  /**
   * Makes route options
   * If an extra object is supplied, it extends the route options
   */
  function makeRouteOptions(object_type, object_id, extra) {
    var options = {
      object_type: object_type,
      object_id: object_id
    };
    _.extend(options, extra);
    return options;
  }

  /**
   * Makes route parameters
   * href is parsed to route, but if already a route, then passes thru
   */
  function makeRouteParam(name, href, options, params) {
    return {
      name: name,
      route: hrefToRoute(href),
      params: params,
      options: options
    };
  }

  /**
   * Add dynamic routes and optionally prefetch data
   *
   * To prefetch data, the route params must have route options defined.
   */
  function addRoutes(eventAggregator, routes, prefetch) {
    routes = _.isArray(routes) ? routes : [routes];

    // discard wordpress routes
    routes = _.reject(routes, function(routeParam) {
      return isWordpressRoute(routeParam.route);
    });

    if (prefetch) {
      // start the data download
      eventAggregator.trigger("content:prefetch", _.map(routes, function(route) {
        return route.options;
      }));
    }
    // add the routes
    eventAggregator.trigger("app:router:addRoute", routes);
  }

  /**
   */
  function isWordpressRoute(route) {
    return (/wp-[\w\-]+$/).test(route);
  }

  /**
   * Build a route path
   *
   * Arguments: 
   *  1: pushstate boolean
   *  2: a url or route to start building on to
   *  others: URI components to add on the start path
   *
   * Returns the built route result
   */
  function buildRoutePath(pushState, start) {
    var sep = pushState ? "/" : "-";
    var path = start.replace(new RegExp(sep+"$"), "");
    var components = Array.prototype.slice.call(arguments, 2);

    _.each(components, function (component) {
      path += sep + encodeURIComponent(component);
    });

    return path;
  }

  // Convert a route to an href
  function routeToHref(route) {
    return route.charAt(0) !== '/' ? "/" + route : route;
  }

  // href to route mapping, handle relative and absolute urls
  // Extract the url path in third catpure.
  // Remove leading and trailing slash.
  // Ref: http://my.safaribooksonline.com/book/programming/regular-expressions/9780596802837/7dot-urls-paths-and-internet-addresses/id3029853#X2ludGVybmFsX0h0bWxWaWV3P3htbGlkPTk3ODA1OTY4MDI4MzclMkZpZDMwMjEzODcmcXVlcnk9
  function hrefToRoute(href) {
    var re = /^([a-z][a-z0-9+\-.]*:(\/\/[^\/?#]+)?)?([a-z0-9\-._~%!$&'()*+,;=:@\/]*)/i;
    var route = href.replace(re, "$3");
    return route.replace(/^\/|\/$/g, "");
  }

  return {
    buildRoutePath: buildRoutePath,
    routeToHref: routeToHref,
    hrefToRoute: hrefToRoute,
    addRoutes: addRoutes,
    makeRouteParam: makeRouteParam,
    makeRouteOptions: makeRouteOptions,
    isWordpressRoute: isWordpressRoute,
    nav: nav
  };

});