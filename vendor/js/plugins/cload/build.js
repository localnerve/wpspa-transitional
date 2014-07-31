#!/usr/bin/env node

// input/output declarations
var input = "cload.js";
var output = "cload.min.js";

// load dependencies
var fs = require("fs");
var uglify = require("uglify-js"),
    jsp = uglify.parser,
    pro = uglify.uglify;

// read input
var code = fs.readFileSync(input, "utf8");

// process
var ast = jsp.parse(code);
ast = pro.ast_mangle(ast);
ast = pro.ast_squeeze(ast);
var result = pro.gen_code(ast);

if (result.length!==0) {
  //console.log("result="+result);
  fs.writeFileSync(output, result);
}
else {
  console.log("No result for "+input);
}