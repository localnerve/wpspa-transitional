/*
 * http maintenance middleware
 * for use with connect/express
 */
var fs = require("fs");
var path = require("path");
var _ = require("underscore");
var config = require("../config").create(process.env.NODE_ENV || "development");

var path503 = path.join(__dirname, "/../../", config.five03File);

var responseType = {
  text: { "Content-Type": "text/plain" },
  json: { "Content-Type": "application/json" },
  html: { "Content-Type": "text/html; charset=utf-8" }
};

var responseAction = {
  text: function(req, res) {
    res.end(req.url + " is undergoing maintenance");
  },
  json: function(req, res) {
    res.end("{ error: \""+req.url+" is undergoing maintenance\" }");
  },
  html: function(req, res, next)  {
    fs.readFile(path503, { encoding: "utf8" }, function(err, html) {
      if (err) {
        next(err);
      } else {
        res.end(html);
      }
    });
  }
};

function acceptToKey(req) {
  var key = "text", accept = req.headers.accept || "";
  
  if (~accept.indexOf("html")) {
    key = "html";
  } else if (~accept.indexOf("json")) {
    key = "json";
  }
  
  return key;
}

function five03(req, res, next) {
  if (config.maintenance) {
    var key = acceptToKey(req);

    res.statusCode = 503;
    res.writeHead(res.statusCode, _.extend(config.maintenanceHeaders, responseType[key]));
    responseAction[key](req, res, next);
  } else {
    next();
  }
}

module.exports = {
  five03: five03
};