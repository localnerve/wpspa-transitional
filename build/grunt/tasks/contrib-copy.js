/**
 * contrib-copy
 *
 * Load and config the copy task.
 * Copies assets into your build directory.
 * This produces an entirely encapsulated build into each directory -
 *  All files required to run the site - the slug.
 */
var nodeDeps = require("../helpers.js").nodeDeps;

module.exports = function(grunt) {

  grunt.config("copy", {
    options: {
      mode: true
    },
    debug: {
      files: [
        // styles are handled by cssmin for release
        {
          src: "<%= project.app %>/styles/pre.css",
          dest: "<%= project.dist.debug %>/pre.css"
        },
        {
          src: "<%= project.app %>/styles/index.css",
          dest: "<%= project.dist.debug %>/index.css"
        },
        // the rest
        {
          src: [
            // files in root besides index.html
            "package.json", "app.js", "Procfile", "404.html", "503.html", "favicon.ico", "robots.txt", "google24e9e21ce1f6df19.html", "BingSiteAuth.xml",
            // other directories
            "<%= project.server %>/**",
            "<%= project.images %>/**", "<%= project.images %>/ajax-loader.gif",
            "<%= project.fonts %>/**",
            // vendor stuff
            "<%= project.vendor %>/js/modernizr/modernizr.js",
            "<%= project.vendor %>/bower/webshim/js-webshim/minified/**"
          ].concat(nodeDeps(grunt.config("pkg"))),
          dest: "<%= project.dist.debug %>/"
        }
      ]
    },
    release: {
      files: [
        // the main dist copy
        {
          src: [
            // static files in root besides index.html
            "package.json", "app.js", "Procfile", "404.html", "503.html", "favicon.ico", "robots.txt", "google24e9e21ce1f6df19.html", "BingSiteAuth.xml",
            // other directories
            "<%= project.server %>/**",
            // *.png is covered by imagemin for release builds
            "<%= project.images %>/foundation/**", "<%= project.images %>/home/**", "<%= project.images %>/ajax-loader.gif",
            "<%= project.fonts %>/**",
            // vendor stuff
            "<%= project.vendor %>/js/modernizr/modernizr.js",
            "<%= project.vendor %>/bower/webshim/js-webshim/minified/**"
          ].concat(nodeDeps(grunt.config("pkg"))),
          dest: "<%= project.dist.release %>/"
        }
      ]
    }
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
};