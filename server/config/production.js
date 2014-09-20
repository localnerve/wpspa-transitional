/*
 * production.js
 *
 * production configuration settings
 *
 * IMPORTANT: Do not add any application consumed values here
 *   Only add values that affect/reflect server operational characteristics
 *   Production application values must be added to config/release.js
 */
var util = require("util");
var Release = require("./release");

function Config() {}
util.inherits(Config, Release);

// Define the app host as the name for the cloud env router
// The application info
Config.prototype.app = {
  hostname: process.env.APP_HOSTNAME,
  port: undefined // must be defined by the real host environment
};

// Reduce production logging to minimal
Config.prototype.loggerFormat = "tiny";

Config.prototype.staticBase = process.env.APP_DIR;

// Define the far-future expiry of statics (in milliseconds)
Config.prototype.staticAge = 31556926000; // one year

Config.prototype.maintenance = process.env.APP_MAINT_FLAG;
Config.prototype.maintenanceHeaders["Retry-After"] = process.env.APP_MAINT_RETRYAFTER;

module.exports = Config;