// The requirejs configuration
require.config({
  deps: [
    "main"
  ],
  paths: {
    jquery: "../vendor/bower/jquery/dist/jquery",
    underscore: "../vendor/bower/lodash/dist/lodash.underscore",
    backbone: "../vendor/bower/backbone/backbone",
    "backbone.wreqr": "../vendor/bower/backbone.wreqr/lib/amd/backbone.wreqr",
    "backbone.babysitter": "../vendor/bower/backbone.babysitter/lib/amd/backbone.babysitter",
    "backbone.marionette": "../vendor/bower/backbone.marionette/lib/core/amd/backbone.marionette",
    server: "../server",
    vendor: "../vendor",
    foundation: "../vendor/foundation-3.2.5/javascript",
    facebook: "//connect.facebook.net/en_US/all",
    polyfiller: "../vendor/bower/webshim/js-webshim/minified/polyfiller"
  },
  config: {
    "loaders/jst": {
      prefix: "app",
      suffix: ".html"
    },
    "components/vendor-interface": {
      polyfillerBasePath: "/vendor/bower/webshim/js-webshim/minified/shims/"
    },
    "components/layout/main": {
      containerCompletions: 3
    },
    "components/layout/content/prefetch": {
      timeout: 15000
    },
    "components/layout/header/main": {
      timeout: 30000,
      ribbonShowEvents: 2
    },
    "components/layout/content-header/showcase/slider/vendor": {
      sliderId: "featured-orbit",
      orbit: {
        fluid: "47x24",
        advanceSpeed: 8000,
        captions: true,
        bullets: false,
        timer: true,
        captionAnimation: "fade"
      },
      mediumImageTest: "only screen and (max-width: 384px)"
    },
    "components/layout/footer/container/main": {
      timeout: 30000
    },
    "components/layout/footer/floater/scroll": {
      activeMediaQuery: "only screen and (max-width: 767px)"
    },
    "components/content/views/content/page/contact/view": {
      timeout: 30000,
      modal: {
        breakpoint: 767,
        fixedSize: "large"
      }
    },
    "components/content/entities/specializations/contact/entities": {
      urlRoot: "/api/contact"
    },
    "components/content/entities/specializations/business/entities": {
      endpoint: "/api/get_category_posts/?slug=business"
    },
    "components/content/entities/specializations/navigation/entities": {
      endpoint: "/api/wpspa/menu"
    },
    "components/content/entities/model": {
      urlRoot: "/api/get_category_posts"
    },
    app: {
      root: "/",
      pushState: true
    },
    "helpers/fb": {
      appId: "487171971408757",
      logging: true,
      xfbml: true
    },
    "helpers/routes": {
      hide: [
        "contact"
      ]
    },
    "helpers/content": {
      backendHostname: "wpspa-transitional.localnerve.com"
    },
    "helpers/params": {
      customFieldsParam: "custom_fields=_wpspa_meta_description%2C_wpspa_page_title%2C_wpspa_prefetch%2Clinks"
    }
  },
  shim: {
    jquery: {
      exports: "$"
    },
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: [
        "underscore",
        "jquery"
      ],
      exports: "Backbone"
    },
    "backbone.wreqr": {
      deps: [
        "backbone"
      ]
    },
    "backbone.babysitter": {
      deps: [
        "backbone"
      ]
    },
    facebook: {
      exports: "FB"
    },
    "foundation/jquery.event.move": {
      deps: [
        "jquery"
      ]
    },
    "foundation/jquery.event.swipe": {
      deps: [
        "jquery"
      ]
    },
    "foundation/jquery.foundation.orbit.ln": {
      deps: [
        "jquery"
      ]
    },
    "foundation/init": {
      deps: [
        "jquery"
      ]
    },
    "foundation/jquery.foundation.navigation.ln": {
      deps: [
        "jquery"
      ]
    },
    "foundation/jquery.foundation.reveal": {
      deps: [
        "jquery"
      ]
    }
  }
});