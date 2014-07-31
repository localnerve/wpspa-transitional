/**
 * contrib-imagemin
 *
 * Load and config the imagemin task.
 * Takes sprited pngs from images, optimizes the bundles, and places them in release/images
 * Run for release build only
 */
module.exports = function(grunt) {

  grunt.config("imagemin", {
    release: {
      files: [{
        expand: true,
        cwd: "<%= project.images %>",
        src: ["**/*.png"],
        dest: "<%= project.dist.release %>/<%= project.images %>"
      }]
    },
    // this is a one-off for optimizing cms-bound images
    content: {
      files: [{
        expand: true,
        cwd: "<%= project.content %>/images",
        src: ["*"],
        dest: "<%= project.content %>/oimages"
      }]
    }
  });

  grunt.loadNpmTasks("grunt-contrib-imagemin");
};