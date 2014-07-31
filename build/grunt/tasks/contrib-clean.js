/**
 * contrib-clean
 *
 * The clean task ensures all files are removed from the appropriate dist/ directory so
 * that no files linger from previous builds.
 */
 module.exports = function(grunt) {

  grunt.config("clean", {
    debug: ["<%= project.dist.debug %>"],
    debugAfterInline: [
      "<%= project.dist.debug %>/index.css",
      "<%= project.dist.debug %>/pre.css",
      "<%= project.dist.debug %>/vendor/js"
    ],
    release: [
      "<%= project.dist.release %>",
      "<%= project.app %>/styles"
    ],
    "release-post": [
      "<%= project.dist.debug %>/<%= project.scripts %>/require.js"
    ],
    releaseAfterInline: [
      "<%= project.dist.release %>/index.css",
      "<%= project.dist.release %>/pre.css",
      "<%= project.dist.release %>/vendor/js"
    ]
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
 };