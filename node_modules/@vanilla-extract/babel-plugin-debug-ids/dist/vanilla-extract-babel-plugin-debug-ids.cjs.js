'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./vanilla-extract-babel-plugin-debug-ids.cjs.prod.js");
} else {
  module.exports = require("./vanilla-extract-babel-plugin-debug-ids.cjs.dev.js");
}
