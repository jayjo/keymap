"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeLocalsConventionReducer = makeLocalsConventionReducer;

var _lodash = _interopRequireDefault(require("lodash.camelcase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function dashesCamelCase(string) {
  return string.replace(/-+(\w)/g, (_, firstLetter) => firstLetter.toUpperCase());
}

function makeLocalsConventionReducer(localsConvention, inputFile) {
  const isFunc = typeof localsConvention === "function";
  return (tokens, [className, value]) => {
    if (isFunc) {
      const convention = localsConvention(className, value, inputFile);
      tokens[convention] = value;
      return tokens;
    }

    switch (localsConvention) {
      case "camelCase":
        tokens[className] = value;
        tokens[(0, _lodash.default)(className)] = value;
        break;

      case "camelCaseOnly":
        tokens[(0, _lodash.default)(className)] = value;
        break;

      case "dashes":
        tokens[className] = value;
        tokens[dashesCamelCase(className)] = value;
        break;

      case "dashesOnly":
        tokens[dashesCamelCase(className)] = value;
        break;
    }

    return tokens;
  };
}