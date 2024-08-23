import { injectStyles } from '../injectStyles/dist/vanilla-extract-css-injectStyles.esm.js';
import { t as transformCss, _ as _objectSpread2, d as dudupeAndJoinClassList } from './transformCss-9149bda7.esm.js';
import { setAdapterIfNotSet, getIdentOption, appendCss, registerClassName, registerComposition, markCompositionUsed } from '../adapter/dist/vanilla-extract-css-adapter.esm.js';
import hash from '@emotion/hash';
import { getAndIncrementRefCounter, getFileScope, hasFileScope } from '../fileScope/dist/vanilla-extract-css-fileScope.esm.js';
import { LRUCache } from 'lru-cache';
import { walkObject, get } from '@vanilla-extract/private';
import cssesc from 'cssesc';
import { diff } from 'deep-object-diff';
import pc from 'picocolors';
import { _ as _taggedTemplateLiteral } from './taggedTemplateLiteral-10998315.esm.js';
import dedent from 'dedent';
import deepmerge from 'deepmerge';
import 'modern-ahocorasick';
import 'css-what';
import 'media-query-parser';

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
    var css = transformCss({
      localClassNames: Array.from(localClassNames),
      composedClassLists,
      cssObjs: bufferedCSSObjs
    }).join('\n');
    injectStyles({
      fileScope,
      css
    });
    bufferedCSSObjs = [];
  },
  getIdentOption: () => process.env.NODE_ENV === 'production' ? 'short' : 'debug'
};
if (typeof window !== 'undefined') {
  setAdapterIfNotSet(browserRuntimeAdapter);
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
  var cache = new LRUCache({
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
    } = getFileScope();
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
  var identOption = getIdentOption();
  var {
    debugId,
    debugFileName = true
  } = _objectSpread2(_objectSpread2({}, typeof arg === 'string' ? {
    debugId: arg
  } : null), typeof arg === 'object' ? arg : null);

  // Convert ref count to base 36 for optimal hash lengths
  var refCount = getAndIncrementRefCounter().toString(36);
  var {
    filePath,
    packageName
  } = getFileScope();
  var fileScopeHash = hash(packageName ? "".concat(packageName).concat(filePath) : filePath);
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

var normaliseObject = obj => walkObject(obj, () => '');
function validateContract(contract, tokens) {
  var theDiff = diff(normaliseObject(contract), normaliseObject(tokens));
  var valid = Object.keys(theDiff).length === 0;
  return {
    valid,
    diffString: valid ? '' : renderDiff(contract, theDiff)
  };
}
function diffLine(value, nesting, type) {
  var whitespace = [...Array(nesting).keys()].map(() => '  ').join('');
  var line = "".concat(type ? type : ' ').concat(whitespace).concat(value);
  if (process.env.NODE_ENV !== 'test') {
    if (type === '-') {
      return pc.red(line);
    }
    if (type === '+') {
      return pc.green(line);
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
  var cssVarName = cssesc(generateIdentifier({
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
  walkObject(tokens, (value, path) => {
    varSetters[get(varContract, path)] = String(value);
  });
  return varSetters;
}
function createThemeContract(tokens) {
  return walkObject(tokens, (_value, path) => {
    return createVar(path.join('-'));
  });
}
function createGlobalThemeContract(tokens, mapFn) {
  return walkObject(tokens, (value, path) => {
    var rawVarName = typeof mapFn === 'function' ? mapFn(value, path) : value;
    var varName = typeof rawVarName === 'string' ? rawVarName.replace(/^\-\-/, '') : null;
    if (typeof varName !== 'string' || varName !== cssesc(varName, {
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
  appendCss({
    type: 'global',
    selector: selector,
    rule: {
      vars: assignVars(themeVars, tokens)
    }
  }, getFileScope());
  if (shouldCreateVars) {
    return themeVars;
  }
}
function createTheme(arg1, arg2, arg3) {
  var themeClassName = generateIdentifier(typeof arg2 === 'object' ? arg3 : arg2);
  registerClassName(themeClassName, getFileScope());
  var vars = typeof arg2 === 'object' ? createGlobalTheme(themeClassName, arg1, arg2) : createGlobalTheme(themeClassName, arg1);
  return vars ? [themeClassName, vars] : themeClassName;
}

var _templateObject;
function composedStyle(rules, debugId) {
  var className = generateIdentifier(debugId);
  registerClassName(className, getFileScope());
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
    result = "".concat(className, " ").concat(dudupeAndJoinClassList(classList));
    registerComposition({
      identifier: className,
      classList: result
    }, getFileScope());
    if (styleRules.length > 0) {
      // If there are styles attached to this composition then it is
      // always used and should never be removed
      markCompositionUsed(className);
    }
  }
  if (styleRules.length > 0) {
    var _rule = deepmerge.all(styleRules, {
      // Replace arrays rather than merging
      arrayMerge: (_, sourceArray) => sourceArray
    });
    appendCss({
      type: 'local',
      selector: className,
      rule: _rule
    }, getFileScope());
  }
  return result;
}
function style(rule, debugId) {
  if (Array.isArray(rule)) {
    return composedStyle(rule, debugId);
  }
  var className = generateIdentifier(debugId);
  registerClassName(className, getFileScope());
  appendCss({
    type: 'local',
    selector: className,
    rule
  }, getFileScope());
  return className;
}

/**
 * @deprecated The same functionality is now provided by the 'style' function when you pass it an array
 */
function composeStyles() {
  var compose = hasFileScope() ? composedStyle : dudupeAndJoinClassList;
  for (var _len = arguments.length, classNames = new Array(_len), _key = 0; _key < _len; _key++) {
    classNames[_key] = arguments[_key];
  }
  return compose(classNames);
}
function globalStyle(selector, rule) {
  appendCss({
    type: 'global',
    selector,
    rule
  }, getFileScope());
}
function fontFace(rule, debugId) {
  var fontFamily = "\"".concat(cssesc(generateIdentifier(debugId), {
    quotes: 'double'
  }), "\"");
  var rules = Array.isArray(rule) ? rule : [rule];
  for (var singleRule of rules) {
    if ('fontFamily' in singleRule) {
      throw new Error(dedent(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n      This function creates and returns a hashed font-family name, so the \"fontFamily\" property should not be provided.\n    \n      If you'd like to define a globally scoped custom font, you can use the \"globalFontFace\" function instead.\n    "]))));
    }
    appendCss({
      type: 'fontFace',
      rule: _objectSpread2(_objectSpread2({}, singleRule), {}, {
        fontFamily
      })
    }, getFileScope());
  }
  return fontFamily;
}
function globalFontFace(fontFamily, rule) {
  var rules = Array.isArray(rule) ? rule : [rule];
  for (var singleRule of rules) {
    appendCss({
      type: 'fontFace',
      rule: _objectSpread2(_objectSpread2({}, singleRule), {}, {
        fontFamily
      })
    }, getFileScope());
  }
}
function keyframes(rule, debugId) {
  var name = cssesc(generateIdentifier(debugId), {
    isIdentifier: true
  });
  appendCss({
    type: 'keyframes',
    name,
    rule
  }, getFileScope());
  return name;
}
function globalKeyframes(name, rule) {
  appendCss({
    type: 'keyframes',
    name,
    rule
  }, getFileScope());
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
var merge = (obj1, obj2) => _objectSpread2(_objectSpread2({}, obj1), obj2);
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
  appendCss({
    type: 'layer',
    name
  }, getFileScope());
  return name;
}
function globalLayer() {
  var [options, name] = getLayerArgs(...arguments);
  if (options.parent) {
    name = "".concat(options.parent, ".").concat(name);
  }
  appendCss({
    type: 'layer',
    name
  }, getFileScope());
  return name;
}

export { assignVars, composeStyles, createContainer, createGlobalTheme, createGlobalThemeContract, createTheme, createThemeContract, createVar, fallbackVar, fontFace, generateIdentifier, globalFontFace, globalKeyframes, globalLayer, globalStyle, keyframes, layer, style, styleVariants };
