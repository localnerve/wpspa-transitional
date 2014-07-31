/**
 * contact route
 *
 * Handle /api/contact get requests
 */
var validator = require("validator");
var sanitizer = require("sanitizer");
var mailer  = require("nodemailer");
var _ = require("underscore");
var urlm = require("url");

var configLib = require("../config");
var config = configLib.create(process.env.NODE_ENV);

var username = process.env.MANDRILL_USERNAME;
var password = process.env.MANDRILL_PASSWORD;

var resStatus = {
  ok: "ok",
  error: "error"
};
var resMessage = {
  no_failure: "",
  mta_failure: "mta failure",
  qs_missing: "querystring is missing",
  name_missing: "name is missing",
  body_missing: "body is missing",
  email_missing: "email is missing",
  email_invalid: "email was invalid"
};

function checkMissing(errors, fields) {
  if (!fields.name) {
    errors.push(resMessage.name_missing);
  }
  if (!fields.message) {
    errors.push(resMessage.body_missing);
  }
  if (!fields.email) {
    errors.push(resMessage.email_missing);
  }
}

function cleanAndValidate(errors, qs) {
  var res;
  if (!qs) {
    errors.push(resMessage.qs_missing);
    return false;
  }

  checkMissing(errors, qs);

  res = {
    email: sanitizer.sanitize(qs.email).trim(),
    name: sanitizer.sanitize(qs.name).trim(),
    message: sanitizer.sanitize(qs.message).trim()
  };

  checkMissing(errors, res);

  if (!validator.isEmail(res.email)) {
    errors.push(resMessage.email_invalid);
  }

  return res;
}

function respond(errors, res) {
  var resData;
  errors = _.uniq(errors);

  resData = {
    status: errors.length > 0 ? resStatus.error : resStatus.ok,
    error: errors.join(",")
  };

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(resData));
}

function contact(req, res, next) {
  var errors = [];
  var qs = urlm.parse(req.url, true).query;

  var input = cleanAndValidate(errors, qs);
  if (errors.length === 0) {
    var smtpTransport = mailer.createTransport(config.mail.transport,{
      service: config.mail.service,
      auth: {
        user: username,
        pass: password
      }
    });
    smtpTransport.sendMail({
      to: config.mail.mailTo,
      from: config.mail.mailFrom,
      replyTo: input.name + " <"+input.email+">",
      subject: config.mail.subject+" from: "+input.name,
      text: input.message
    }, function(err, result) {
      if (err) {
        errors.push(resMessage.mta_failure+": "+err);
      }
      respond(errors, res);
    });
  } else {
    respond(errors, res);
  }
}

module.exports = contact;