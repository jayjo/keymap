'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var injectStyles_dist_vanillaExtractCssInjectStyles = require('../injectStyles/dist/vanilla-extract-css-injectStyles.cjs.prod.js');
var transformCss_dist_vanillaExtractCssTransformCss = require('./transformCss-5f281e7b.cjs.prod.js');
var adapter_dist_vanillaExtractCssAdapter = require('../adapter/dist/vanilla-extract-css-adapter.cjs.prod.js');
var hash = require('@emotion/hash');
var fileScope_dist_vanillaExtractCssFileScope = require('../fileScope/dist/vanilla-extract-css-fileScope.cjs.prod.js');
var lruCache = require('lru-cache');
var _private = require('@vanilla-extract/private');
var cssesc = require('cssesc');
var deepObjectDiff = require('deep-object-diff');
var pc = require('picocolors');
var taggedTemplateLiteral = require('./taggedTemplateLiteral-0bfb2e96.cjs.prod.js');
var dedent = require('dedent');
var deepmerge = require('deepmerge');
require('modern-ahocorasick');
require('css-what');
require('media-query-parser');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var hash__default = /*#__PURE__*/_interopDefault(hash);
var cssesc__default = /*#__PURE__*/_interopDefault(cssesc);
var pc__default = /*#__PURE__*/_interopDefault(pc);
var dedent__default = /*#__PURE__*/_interopDefault(dedent);
var deepmerge__default = /*#__PURE__*/_interopDefault(deepmerge);

var localClassNames = new Set();
var composedClassLists = [];
var bufferedCSSObjs = [];
var browserRuntimeAdapter = {
  appendCss: cssObj => {
    bufferedCSSObjs.push(cssObj);
  },
  registerClassName: className => {
    localClassNames.add(className);
  },
  registerComposition: composition => {
    composedClassLists.push(composition);
  },
  markCompositionUsed: () => {},
  onEndFileScope: fileScope => {
    var css = transformCss_dist_vanillaExtractCssTransformCss.transformCss({
      localClassNames: Array.from(localClassNames),
      composedClassLists,
      cssObjs: bufferedCSSObjs
    }).join('\n');
    injectStyles_dist_vanillaExtractCssInjectStyles.injectStyles({
      fileScope,
      css
    });
    bufferedCSSObjs = [];
  },
  getIdentOption: () => 'short' 
};
if (typeof window !== 'undefined') {
  adapter_dist_vanillaExtractCssAdapter.setAdapterIfNotSet(browserRuntimeAdapter);
}

var getLastSlashBeforeIndex = (path, index) => {
  var pathIndex = index - 1;
  while (pathIndex >= 0) {
    if (path[pathIndex] === '/') {
      return pathIndex;
    }
    pathIndex--;
  }
  return -1;
};

/**
 * Assumptions:
 * - The path is always normalized to use posix file separators (/) (see `addFileScope`)
 * - The path is always relative to the project root, i.e. there will never be a leading slash (see `addFileScope`)
 * - As long as `.css` is there, we have a valid `.css.*` file path, because otherwise there wouldn't
 *   be a file scope to begin with
 *
 * The LRU cache we use can't cache undefined/null values, so we opt to return an empty string,
 * rather than using a custom Symbol or something similar.
 */
var _getDebugFileName = path => {
  var file;
  var lastIndexOfDotCss = path.lastIndexOf('.css');
  if (lastIndexOfDotCss === -1) {
    return '';
  }
  var lastSlashIndex = getLastSlashBeforeIndex(path, lastIndexOfDotCss);
  file = path.slice(lastSlashIndex + 1, lastIndexOfDotCss);

  // There are no slashes, therefore theres no directory to extract
  if (lastSlashIndex === -1) {
    return file;
  }
  var secondLastSlashIndex = getLastSlashBeforeIndex(path, lastSlashIndex - 1);
  // If secondLastSlashIndex is -1, it means that the path looks like `directory/file.css.ts`,
  // in which case dir will still be sliced starting at 0, which is what we want
  var dir = path.slice(secondLastSlashIndex + 1, lastSlashIndex);
  var debugFileName = file !== 'index' ? file : dir;
  return debugFileName;
};
var memoizedGetDebugFileName = () => {
  var cache = new lruCache.LRUCache({
    max: 500
  });
  return path => {
    var cachedResult = cache.get(path);
    if (cachedResult) {
      return cachedResult;
    }
    var result = _getDebugFileName(path);
    cache.set(path, result);
    return result;
  };
};
var getDebugFileName = memoizedGetDebugFileName();

function getDevPrefix(_ref) {
  var {
    debugId,
    debugFileName
  } = _ref;
  var parts = debugId ? [debugId.replace(/\s/g, '_')] : [];
  if (debugFileName) {
    var {
      filePath
    } = fileScope_dist_vanillaExtractCssFileScope.getFileScope();
    var _debugFileName = getDebugFileName(filePath);

    // debugFileName could be an empty string
    if (_debugFileName) {
      parts.unshift(_debugFileName);
    }
  }
  return parts.join('_');
}
function normalizeIdentifier(identifier) {
  return identifier.match(/^[0-9]/) ? "_".concat(identifier) : identifier;
}
function generateIdentifier(arg) {
  var identOption = adapter_dist_vanillaExtractCssAdapter.getIdentOption();
  var {
    debugId,
    debugFileName = true
  } = transformCss_dist_vanillaExtractCssTransformCss._objectSpread2(transformCss_dist_vanillaExtractCssTransformCss._objectSpread2({}, typeof arg === 'string' ? {
    debugId: arg
  } : null), typeof arg === 'object' ? arg : null);

  // Convert ref count to base 36 for optimal hash lengths
  var refCount = fileScope_dist_vanillaExtractCssFileScope.getAndIncrementRefCounter().toString(36);
  var {
    filePath,
    packageName
  } = fileScope_dist_vanillaExtractCssFileScope.getFileScope();
  var fileScopeHash = hash__default["default"](packageName ? "".concat(packageName).concat(filePath) : filePath);
  var identifier = "".concat(fileScopeHash).concat(refCount);
  if (identOption === 'debug') {
    var devPrefix = getDevPrefix({
      debugId,
      debugFileName
    });
    if (devPrefix) {
      identifier = "".concat(devPrefix, "__").concat(identifier);
    }
    return normalizeIdentifier(identifier);
  }
  if (typeof identOption === 'function') {
    identifier = identOption({
      hash: identifier,
      debugId,
      filePath,
      packageName
    });
    if (!identifier.match(/^[A-Z_][0-9A-Z_-]+$/i)) {
      throw new Error("Identifier function returned invalid indentifier: \"".concat(identifier, "\""));
    }
    return identifier;
  }
  return normalizeIdentifier(identifier);
}

var normaliseObject = obj => _private.walkObject(obj, () => '');
function validateContract(contract, tokens) {
  var theDiff = deepObjectDiff.diff(normaliseObject(contract), normaliseObject(tokens));
  var valid = Object.keys(theDiff).length === 0;
  return {
    valid,
    diffString: valid ? '' : renderDiff(contract, theDiff)
  };
}
function diffLine(value, nesting, type) {
  var whitespace = [...Array(nesting).keys()].map(() => '  ').join('');
  var line = "".concat(type ? type : ' ').concat(whitespace).concat(value);
  {
    if (type === '-') {
      return pc__default["default"].red(line);
    }
    if (type === '+') {
      return pc__default["default"].green(line);
    }
  }
  return line;
}
function renderDiff(orig, diff) {
  var nesting = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var lines = [];
  if (nesting === 0) {
    lines.push(diffLine('{', 0));
  }
  var innerNesting = nesting + 1;
  var keys = Object.keys(diff).sort();
  for (var key of keys) {
    var value = diff[key];
    if (!(key in orig)) {
      lines.push(diffLine("".concat(key, ": ...,"), innerNesting, '+'));
    } else if (typeof value === 'object') {
      lines.push(diffLine("".concat(key, ": {"), innerNesting));
      lines.push(renderDiff(orig[key], diff[key], innerNesting));
      lines.push(diffLine('}', innerNesting));
    } else {
      lines.push(diffLine("".concat(key, ": ...,"), innerNesting, '-'));
    }
  }
  if (nesting === 0) {
    lines.push(diffLine('}', 0));
  }
  return lines.join('\n');
}

function createVar(debugId) {
  var cssVarName = cssesc__default["default"](generateIdentifier({
    debugId,
    debugFileName: false
  }), {
    isIdentifier: true
  });
  return "var(--".concat(cssVarName, ")");
}
function fallbackVar() {
  var finalValue = '';
  for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }
  values.reverse().forEach(value => {
    if (finalValue === '') {
      finalValue = String(value);
    } else {
      if (typeof value !== 'string' || !/^var\(--.*\)$/.test(value)) {
        throw new Error("Invalid variable name: ".concat(value));
      }
      finalValue = value.replace(/\)$/, ", ".concat(finalValue, ")"));
    }
  });
  return finalValue;
}
function assignVars(varContract, tokens) {
  var varSetters = {};
  var {
    valid,
    diffString
  } = validateContract(varContract, tokens);
  if (!valid) {
    throw new Error("Tokens don't match contract.\n".concat(diffString));
  }
  _private.walkObject(tokens, (value, path) => {
    varSetters[_private.get(varContract, path)] = String(value);
  });
  return varSetters;
}
function createThemeContract(tokens) {
  return _private.walkObject(tokens, (_value, path) => {
    return createVar(path.join('-'));
  });
}
function createGlobalThemeContract(tokens, mapFn) {
  return _private.walkObject(tokens, (value, path) => {
    var rawVarName = typeof mapFn === 'function' ? mapFn(value, path) : value;
    var varName = typeof rawVarName === 'string' ? rawVarName.replace(/^\-\-/, '') : null;
    if (typeof varName !== 'string' || varName !== cssesc__default["default"](varName, {
      isIdentifier: true
    })) {
      throw new Error("Invalid variable name for \"".concat(path.join('.'), "\": ").concat(varName));
    }
    return "var(--".concat(varName, ")");
  });
}

function createGlobalTheme(selector, arg2, arg3) {
  var shouldCreateVars = Boolean(!arg3);
  var themeVars = shouldCreateVars ? createThemeContract(arg2) : arg2;
  var tokens = shouldCreateVars ? arg2 : arg3;
  adapter_dist_vanillaExtractCssAdapter.appendCss({
    type: 'global',
    selector: selector,
    rule: {
      vars: assignVars(themeVars, tokens)
    }
  }, fileScope_dist_vanillaExtractCssFileScope.getFileScope());
  if (shouldCreateVars) {
    return themeVars;
  }
}
function createTheme(arg1, arg2, arg3) {
  var themeClassName = generateIdentifier(typeof arg2 === 'object' ? arg3 : arg2);
  adapter_dist_vanillaExtractCssAdapter.registerClassName(themeClassName, fileScope_dist_vanillaExtractCssFileScope.getFileScope());
  var vars = typeof arg2 === 'object' ? createGlobalTheme(themeClassName, arg1, arg2) : createGlobalTheme(themeClassName, arg1);
  return vars ? [themeClassName, vars] : themeClassName;
}

var _templateObject;
function composedStyle(rules, debugId) {
  var className = generateIdentifier(debugId);
  adapter_dist_vanillaExtractCssAdapter.registerClassName(className, fileScope_dist_vanillaExtractCssFileScope.getFileScope());
  var classList = [];
  var styleRules = [];
  for (var rule of rules) {
    if (typeof rule === 'string') {
      classList.push(rule);
    } else {
      styleRules.push(rule);
    }
  }
  var result = className;
  if (classList.length > 0) {
    result = "".concat(className, " ").concat(transformCss_dist_vanillaExtractCssTransformCss.dudupeAndJoinClassList(classList));
    adapter_dist_vanillaExtractCssAdapter.registerComposition({
      identifier: className,
      classList: result
    }, fileScope_dist_vanillaExtractCssFileScope.getFileScope());
    if (styleRules.length > 0) {
      // If there are styles attached to this composition then it is
      // always used and should never be removed
      adapter_dist_vanillaExtractCssAdapter.markCompositionUsed(className);
    }
  }
  if (styleRules.length > 0) {
    var _rule = deepmerge__default["default"].all(styleRules, {
      // Replace arrays rather than merging
      arrayMerge: (_, sourceArray) => sourceArray
    });
    adapter_dist_vanillaExtractCssAdapter.appendCss({
      type: 'local',
      selector: className,
      rule: _rule
    }, fileScope_dist_vanillaExtractCssFileScope.getFileScope());
  }
  return result;
}
function style(rule, debugId) {
  if (Array.isArray(rule)) {
    return composedStyle(rule, debugId);
  }
  var className = generateIdentifier(debugId);
  adapter_dist_vanillaExtractCssAdapter.registerClassName(className, fileScope_dist_vanillaExtractCssFileScope.getFileScope());
  adapter_dist_vanillaExtractCssAdapter.appendCss({
    type: 'local',
    selector: className,
    rule
  }, fileScope_dist_vanillaExtractCssFileScope.getFileScope());
  return className;
}

/**
 * @deprecated The same functionality is now provided by the 'style' function when you pass it an array
 */
function composeStyles() {
  var compose = fileScope_dist_vanillaExtractCssFileScope.hasFileScope() ? composedStyle : transformCss_dist_vanillaExtractCssTransformCss.dudupeAndJoinClassList;
  for (var _len = arguments.length, classNames = new Array(_len), _key = 0; _key < _len; _key++) {
    classNames[_key] = arguments[_key];
  }
  return compose(classNames);
}
function globalStyle(selector, rule) {
  adapter_dist_vanillaExtractCssAdapter.appendCss({
    type: 'global',
    selector,
    rule
  }, fileScope_dist_vanillaExtractCssFileScope.getFileScope());
}
function fontFace(rule, debugId) {
  var fontFamily = "\"".concat(cssesc__default["default"](generateIdentifier(debugId), {
    quotes: 'double'
  }), "\"");
  var rules = Array.isArray(rule) ? rule : [rule];
  for (var singleRule of rules) {
    if ('fontFamily' in singleRule) {
      throw new Error(dedent__default["default"](_templateObject || (_templateObject = taggedTemplateLiteral._taggedTemplateLiteral(["\n      This function creates and returns a hashed font-family name, so the \"fontFamily\" property should not be provided.\n    \n      If you'd like to define a globally scoped custom font, you can use the \"globalFontFace\" function instead.\n    "]))));
    }
    adapter_dist_vanillaExtractCssAdapter.appendCss({
      type: 'fontFace',
      rule: transformCss_dist_vanillaExtractCssTransformCss._objectSpread2(transformCss_dist_vanillaExtractCssTransformCss._objectSpread2({}, singleRule), {}, {
        fontFamily
      })
    }, fileScope_dist_vanillaExtractCssFileScope.getFileScope());
  }
  return fontFamily;
}
function globalFontFace(fontFamily, rule) {
  var rules = Array.isArray(rule) ? rule : [rule];
  for (var singleRule of rules) {
    adapter_dist_vanillaExtractCssAdapter.appendCss({
      type: 'fontFace',
      rule: transformCss_dist_vanillaExtractCssTransformCss._objectSpread2(transformCss_dist_vanillaExtractCssTransformCss._objectSpread2({}, singleRule), {}, {
        fontFamily
      })
    }, fileScope_dist_vanillaExtractCssFileScope.getFileScope());
  }
}
function keyframes(rule, debugId) {
  var name = cssesc__default["default"](generateIdentifier(debugId), {
    isIdentifier: true
  });
  adapter_dist_vanillaExtractCssAdapter.appendCss({
    type: 'keyframes',
    name,
    rule
  }, fileScope_dist_vanillaExtractCssFileScope.getFileScope());
  return name;
}
function globalKeyframes(name, rule) {
  adapter_dist_vanillaExtractCssAdapter.appendCss({
    type: 'keyframes',
    name,
    rule
  }, fileScope_dist_vanillaExtractCssFileScope.getFileScope());
}
function styleVariants() {
  if (typeof (arguments.length <= 1 ? undefined : arguments[1]) === 'function') {
    var _data = arguments.length <= 0 ? undefined : arguments[0];
    var _mapData = arguments.length <= 1 ? undefined : arguments[1];
    var _debugId = arguments.length <= 2 ? undefined : arguments[2];
    var _classMap = {};
    for (var _key2 in _data) {
      _classMap[_key2] = style(_mapData(_data[_key2], _key2), _debugId ? "".concat(_debugId, "_").concat(_key2) : _key2);
    }
    return _classMap;
  }
  var styleMap = arguments.length <= 0 ? undefined : arguments[0];
  var debugId = arguments.length <= 1 ? undefined : arguments[1];
  var classMap = {};
  for (var _key3 in styleMap) {
    classMap[_key3] = style(styleMap[_key3], debugId ? "".concat(debugId, "_").concat(_key3) : _key3);
  }
  return classMap;
}

// createContainer is used for local scoping of CSS containers
// For now it is mostly just an alias of generateIdentifier
var createContainer = debugId => generateIdentifier(debugId);

var defaultLayerOptions = {};
var merge = (obj1, obj2) => transformCss_dist_vanillaExtractCssTransformCss._objectSpread2(transformCss_dist_vanillaExtractCssTransformCss._objectSpread2({}, obj1), obj2);
var getLayerArgs = function getLayerArgs() {
  var options = defaultLayerOptions;
  var debugId = arguments.length <= 0 ? undefined : arguments[0];
  if (typeof (arguments.length <= 0 ? undefined : arguments[0]) === 'object') {
    options = merge(defaultLayerOptions, arguments.length <= 0 ? undefined : arguments[0]);
    debugId = arguments.length <= 1 ? undefined : arguments[1];
  }
  return [options, debugId];
};
function layer() {
  var [options, debugId] = getLayerArgs(...arguments);
  var name = generateIdentifier(debugId);
  if (options.parent) {
    name = "".concat(options.parent, ".").concat(name);
  }
  adapter_dist_vanillaExtractCssAdapter.appendCss({
    type: 'layer',
    name
  }, fileScope_dist_vanillaExtractCssFileScope.getFileScope());
  return name;
}
function globalLayer() {
  var [options, name] = getLayerArgs(...arguments);
  if (options.parent) {
    name = "".concat(options.parent, ".").concat(name);
  }
  adapter_dist_vanillaExtractCssAdapter.appendCss({
    type: 'layer',
    name
  }, fileScope_dist_vanillaExtractCssFileScope.getFileScope());
  return name;
}

exports.assignVars = assignVars;
exports.composeStyles = composeStyles;
exports.createContainer = createContainer;
exports.createGlobalTheme = createGlobalTheme;
exports.createGlobalThemeContract = createGlobalThemeContract;
exports.createTheme = createTheme;
exports.createThemeContract = createThemeContract;
exports.createVar = createVar;
exports.fallbackVar = fallbackVar;
exports.fontFace = fontFace;
exports.generateIdentifier = generateIdentifier;
exports.globalFontFace = globalFontFace;
exports.globalKeyframes = globalKeyframes;
exports.globalLayer = globalLayer;
exports.globalStyle = globalStyle;
exports.keyframes = keyframes;
exports.layer = layer;
exports.style = style;
exports.styleVariants = styleVariants;
