# WPSPA Transitional Application
> A transitional web application boilerplate for the WPSPA techniques

## Background
This app is based on [WPSPA](http://github.com/localnerve/wpspa). This transitional implementation came about because I wanted to utilize the [WPSPA](http://github.com/localnerve/wpspa) design on an older project that had to support IE8. So jQuery and old Foundation found their way back into usefulness. This also brought me back to balancing a desktop-first grid with mobile-first sensibilities.

Some of the changes:
+ Plain 'ol Category-based WP data design.
+ Better usage of model cache
+ Old Foundation for out-of-the-box IE8 support
+ DIY VPS App Host scripts
+ Social (Facebook and Twitter) conditional integration
+ Conditional HTML 5 form validation feature-based polyfill
+ Many more that I'll document soon...

## External Dependencies
### css and responsive fwk
+ Ruby
+ Compass
+ Sass
+ Foundation 3.2.5
  + Modular Scale

### build and packages
+ Git
+ Node
+ Npm
+ Grunt-cli
+ Bower

## Unmanaged Vendor packages
+ modernizr \(custom build\)

### Dynamic and Conditionally loaded modules
+ Facebook
+ Twitter
+ webshim

## Notes from DIY VPS App Host \(vendor example\)
+ Setup VPS Admin User in vendor control panel
+ Setup VPS Config in vendor control panel
+ [Install Node](https://gist.github.com/isaacs/579814)
+ [Install Redis](http://redis.io/topics/quickstart)
+ [Install Node App](https://github.com/chovy/node-startup)
  + See deploy/diy/node-app for script
+ Install grunt-cli globally
+ Install bower globally
+ Ruby already setup globally \(by vendor - check/version, check for ~/.gems\)
+ Install compass 0.12.2 \(no sudo, uses ~/.gems\)
+ Install foundation 3.2.5 \(for modular scale gem\)
  + Everything else is project local
  + modular scale gem dep for 3.2.5 forces ruby dependency at build time
+ Adjust production.js \(if required\)
+ Set node-app environment variables