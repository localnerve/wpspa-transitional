# WPSPA Transitional Application
> This is a transitional web application boilerplate for the WPSPA techniques

## Background
This app is based on [WPSPA](http://github.com/localnerve/wpspa). Some of the changes:
+ Plain 'ol Category based WP data design
+ Better usage of model cache
+ Old Foundation for \"natural\" IE8 support
+ DIY VPS App Host

## DIY VPS App Host (Dreamhost example)
+ Setup VPS Admin User in Dreamhost panel
+ Setup VPS Config in Dreamhost panel
+ Install Node
  + https://gist.github.com/isaacs/579814
+ Install Redis
  + http://redis.io/topics/quickstart
+ Install Node App
  + https://github.com/chovy/node-startup
  + See vendor/dreamhost/node-app for script
+ Install grunt-cli globally
+ Install bower globally
+ Ruby already setup globally (by Dreamhost - check/version, check for ~/.gems)
+ Install compass 0.12.2 (no sudo, uses ~/.gems)
+ Install foundation 3.2.5 (for modular scale gem)
  + Everything else is project local
  + modular scale gem dep for 3.2.5 forces ruby dependency at build time
+ Adjust production.js (if required)
+ Set node-app environment variables

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
+ modernizr (localnerve custom build)

## kept around in case have to support even older IE:
+ cload (localnerve custom requirejs plugin)
+ oldie (localnerve custom polyfills for old browsers)

### Dynamic and Conditionally loaded modules
+ Facebook
+ Twitter
+ webshim