/**
 * contrib-compass
 *
 * Load and config compass. Compass must be globally installed in the environment
 */
 module.exports = function(grunt) {

  grunt.config("compass", {
    options: {
      sassDir: "<%= project.app %>/sass",
      cssDir: "<%= project.app %>/styles",
      javascriptsDir: "<%= project.vendor %>/gem/foundation",
      imagesDir: "<%= project.images %>",
      fontsDir: "<%= project.fonts %>",
      importPath: [
        "<%= project.vendor %>/foundation-3.2.5/scss",
        "<%= project.app %>"
      ]
    },
    test: {
      options: {
        environment: "development"
      }
    },
    dev: {
      options: {
        environment: "development",
        debugInfo: true//,
        //force: true
      }
    },
    debug: {
      options: {
        environment: "development",
        debugInfo: true
      }
    },
    release: {
      environment: "production"
    }
  });

  grunt.loadNpmTasks("grunt-contrib-compass");
 };