"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.behaviours = void 0;
exports.getDefaultPlugins = getDefaultPlugins;
exports.getDefaultScopeBehaviour = getDefaultScopeBehaviour;
exports.getScopedNameGenerator = getScopedNameGenerator;

var _postcssModulesExtractImports = _interopRequireDefault(require("postcss-modules-extract-imports"));

var _genericNames = _interopRequireDefault(require("generic-names"));

var _postcssModulesLocalByDefault = _interopRequireDefault(require("postcss-modules-local-by-default"));

var _postcssModulesScope = _interopRequireDefault(require("postcss-modules-scope"));

var _stringHash = _interopRequireDefault(require("string-hash"));

var _postcssModulesValues = _interopRequireDefault(require("postcss-modules-values"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const behaviours = {
  LOCAL: "local",
  GLOBAL: "global"
};
exports.behaviours = behaviours;

function getDefaultPlugins({
  behaviour,
  generateScopedName,
  exportGlobals
}) {
  const scope = (0, _postcssModulesScope.default)({
    generateScopedName,
    exportGlobals
  });
  const plugins = {
    [behaviours.LOCAL]: [_postcssModulesValues.default, (0, _postcssModulesLocalByDefault.default)({
      mode: "local"
    }), _postcssModulesExtractImports.default, scope],
    [behaviours.GLOBAL]: [_postcssModulesValues.default, (0, _postcssModulesLocalByDefault.default)({
      mode: "global"
    }), _postcssModulesExtractImports.default, scope]
  };
  return plugins[behaviour];
}

function isValidBehaviour(behaviour) {
  return Object.keys(behaviours).map(key => behaviours[key]).indexOf(behaviour) > -1;
}

function getDefaultScopeBehaviour(scopeBehaviour) {
  return scopeBehaviour && isValidBehaviour(scopeBehaviour) ? scopeBehaviour : behaviours.LOCAL;
}

function generateScopedNameDefault(name, filename, css) {
  const i = css.indexOf(`.${name}`);
  const lineNumber = css.substr(0, i).split(/[\r\n]/).length;
  const hash = (0, _stringHash.default)(css).toString(36).substr(0, 5);
  return `_${name}_${hash}_${lineNumber}`;
}

function getScopedNameGenerator(generateScopedName, hashPrefix) {
  const scopedNameGenerator = generateScopedName || generateScopedNameDefault;

  if (typeof scopedNameGenerator === "function") {
    return scopedNameGenerator;
  }

  return (0, _genericNames.default)(scopedNameGenerator, {
    context: process.cwd(),
    hashPrefix: hashPrefix
  });
}