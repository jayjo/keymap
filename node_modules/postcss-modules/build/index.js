"use strict";

var _fs = require("fs");

var _fs2 = require("./fs");

var _pluginFactory = require("./pluginFactory");

(0, _fs2.setFileSystem)({
  readFile: _fs.readFile,
  writeFile: _fs.writeFile
});

module.exports = (opts = {}) => (0, _pluginFactory.makePlugin)(opts);

module.exports.postcss = true;