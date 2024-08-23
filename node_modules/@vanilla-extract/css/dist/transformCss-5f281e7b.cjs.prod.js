'use strict';

var _private = require('@vanilla-extract/private');
var cssesc = require('cssesc');
var AhoCorasick = require('modern-ahocorasick');
var adapter_dist_vanillaExtractCssAdapter = require('../adapter/dist/vanilla-extract-css-adapter.cjs.prod.js');
var taggedTemplateLiteral = require('./taggedTemplateLiteral-0bfb2e96.cjs.prod.js');
var cssWhat = require('css-what');
var dedent = require('dedent');
var mediaQueryParser = require('media-query-parser');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var cssesc__default = /*#__PURE__*/_interopDefault(cssesc);
var AhoCorasick__default = /*#__PURE__*/_interopDefault(AhoCorasick);
var dedent__default = /*#__PURE__*/_interopDefault(dedent);

function toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == typeof i ? i : String(i);
}

function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

function forEach(obj, fn) {
  for (var _key in obj) {
    fn(obj[_key], _key);
  }
}
function omit(obj, omitKeys) {
  var result = {};
  for (var _key2 in obj) {
    if (omitKeys.indexOf(_key2) === -1) {
      result[_key2] = obj[_key2];
    }
  }
  return result;
}
function mapKeys(obj, fn) {
  var result = {};
  for (var _key3 in obj) {
    result[fn(obj[_key3], _key3)] = obj[_key3];
  }
  return result;
}
function composeStylesIntoSet(set) {
  for (var _len = arguments.length, classNames = new Array(_len > 1 ? _len - 1 : 0), _key5 = 1; _key5 < _len; _key5++) {
    classNames[_key5 - 1] = arguments[_key5];
  }
  for (var className of classNames) {
    if (className.length === 0) {
      continue;
    }
    if (typeof className === 'string') {
      if (className.includes(' ')) {
        composeStylesIntoSet(set, ...className.trim().split(' '));
      } else {
        set.add(className);
      }
    } else if (Array.isArray(className)) {
      composeStylesIntoSet(set, ...className);
    }
  }
}
function dudupeAndJoinClassList(classNames) {
  var set = new Set();
  composeStylesIntoSet(set, ...classNames);
  return Array.from(set).join(' ');
}

var _templateObject$1;

// https://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
function escapeRegex(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
var validateSelector = (selector, targetClassName) => {
  var replaceTarget = () => {
    var targetRegex = new RegExp(".".concat(escapeRegex(cssesc__default["default"](targetClassName, {
      isIdentifier: true
    }))), 'g');
    return selector.replace(targetRegex, '&');
  };
  var selectorParts;
  try {
    selectorParts = cssWhat.parse(selector);
  } catch (err) {
    throw new Error("Invalid selector: ".concat(replaceTarget()));
  }
  selectorParts.forEach(tokens => {
    try {
      for (var i = tokens.length - 1; i >= -1; i--) {
        if (!tokens[i]) {
          throw new Error();
        }
        var token = tokens[i];
        if (token.type === 'child' || token.type === 'parent' || token.type === 'sibling' || token.type === 'adjacent' || token.type === 'descendant') {
          throw new Error();
        }
        if (token.type === 'attribute' && token.name === 'class' && token.value === targetClassName) {
          return; // Found it
        }
      }
    } catch (err) {
      throw new Error(dedent__default["default"](_templateObject$1 || (_templateObject$1 = taggedTemplateLiteral._taggedTemplateLiteral(["\n        Invalid selector: ", "\n    \n        Style selectors must target the '&' character (along with any modifiers), e.g. ", " or ", ".\n        \n        This is to ensure that each style block only affects the styling of a single class.\n        \n        If your selector is targeting another class, you should move it to the style definition for that class, e.g. given we have styles for 'parent' and 'child' elements, instead of adding a selector of ", ") to 'parent', you should add ", " to 'child').\n        \n        If your selector is targeting something global, use the 'globalStyle' function instead, e.g. if you wanted to write ", ", you should instead write 'globalStyle(", ", { ... })'\n      "])), replaceTarget(), '`${parent} &`', '`${parent} &:hover`', '`& ${child}`', '`${parent} &`', '`& h1`', '`${parent} h1`'));
    }
  });
};

/** e.g. @media screen and (min-width: 500px) */

class ConditionalRuleset {
  /**
   * Stores information about where conditions must be in relation to other conditions
   *
   * e.g. mobile -> tablet, desktop
   */

  constructor() {
    this.ruleset = new Map();
    this.precedenceLookup = new Map();
  }
  findOrCreateCondition(conditionQuery) {
    var targetCondition = this.ruleset.get(conditionQuery);
    if (!targetCondition) {
      // No target condition so create one
      targetCondition = {
        query: conditionQuery,
        rules: [],
        children: new ConditionalRuleset()
      };
      this.ruleset.set(conditionQuery, targetCondition);
    }
    return targetCondition;
  }
  getConditionalRulesetByPath(conditionPath) {
    var currRuleset = this;
    for (var query of conditionPath) {
      var condition = currRuleset.findOrCreateCondition(query);
      currRuleset = condition.children;
    }
    return currRuleset;
  }
  addRule(rule, conditionQuery, conditionPath) {
    var ruleset = this.getConditionalRulesetByPath(conditionPath);
    var targetCondition = ruleset.findOrCreateCondition(conditionQuery);
    if (!targetCondition) {
      throw new Error('Failed to add conditional rule');
    }
    targetCondition.rules.push(rule);
  }
  addConditionPrecedence(conditionPath, conditionOrder) {
    var ruleset = this.getConditionalRulesetByPath(conditionPath);
    for (var i = 0; i < conditionOrder.length; i++) {
      var _ruleset$precedenceLo;
      var query = conditionOrder[i];
      var conditionPrecedence = (_ruleset$precedenceLo = ruleset.precedenceLookup.get(query)) !== null && _ruleset$precedenceLo !== void 0 ? _ruleset$precedenceLo : new Set();
      for (var lowerPrecedenceCondition of conditionOrder.slice(i + 1)) {
        conditionPrecedence.add(lowerPrecedenceCondition);
      }
      ruleset.precedenceLookup.set(query, conditionPrecedence);
    }
  }
  isCompatible(incomingRuleset) {
    for (var [condition, orderPrecedence] of this.precedenceLookup.entries()) {
      for (var lowerPrecedenceCondition of orderPrecedence) {
        var _incomingRuleset$prec;
        if ((_incomingRuleset$prec = incomingRuleset.precedenceLookup.get(lowerPrecedenceCondition)) !== null && _incomingRuleset$prec !== void 0 && _incomingRuleset$prec.has(condition)) {
          return false;
        }
      }
    }

    // Check that children are compatible
    for (var {
      query,
      children
    } of incomingRuleset.ruleset.values()) {
      var matchingCondition = this.ruleset.get(query);
      if (matchingCondition && !matchingCondition.children.isCompatible(children)) {
        return false;
      }
    }
    return true;
  }
  merge(incomingRuleset) {
    // Merge rulesets into one array
    for (var {
      query,
      rules,
      children
    } of incomingRuleset.ruleset.values()) {
      var matchingCondition = this.ruleset.get(query);
      if (matchingCondition) {
        matchingCondition.rules.push(...rules);
        matchingCondition.children.merge(children);
      } else {
        this.ruleset.set(query, {
          query,
          rules,
          children
        });
      }
    }

    // Merge order precedences
    for (var [condition, incomingOrderPrecedence] of incomingRuleset.precedenceLookup.entries()) {
      var _this$precedenceLooku;
      var orderPrecedence = (_this$precedenceLooku = this.precedenceLookup.get(condition)) !== null && _this$precedenceLooku !== void 0 ? _this$precedenceLooku : new Set();
      this.precedenceLookup.set(condition, new Set([...orderPrecedence, ...incomingOrderPrecedence]));
    }
  }

  /**
   * Merge another ConditionalRuleset into this one if they are compatible
   *
   * @returns true if successful, false if the ruleset is incompatible
   */
  mergeIfCompatible(incomingRuleset) {
    if (!this.isCompatible(incomingRuleset)) {
      return false;
    }
    this.merge(incomingRuleset);
    return true;
  }
  getSortedRuleset() {
    var _this = this;
    var sortedRuleset = [];

    // Loop through all queries and add them to the sorted ruleset
    var _loop = function _loop(dependents) {
      var conditionForQuery = _this.ruleset.get(query);
      if (!conditionForQuery) {
        throw new Error("Can't find condition for ".concat(query));
      }

      // Find the location of the first dependent condition in the sortedRuleset
      // A dependent condition is a condition that must be placed *after* the current one
      var firstMatchingDependent = sortedRuleset.findIndex(condition => dependents.has(condition.query));
      if (firstMatchingDependent > -1) {
        // Insert the condition before the dependent one
        sortedRuleset.splice(firstMatchingDependent, 0, conditionForQuery);
      } else {
        // No match, just insert at the end
        sortedRuleset.push(conditionForQuery);
      }
    };
    for (var [query, dependents] of this.precedenceLookup.entries()) {
      _loop(dependents);
    }
    return sortedRuleset;
  }
  renderToArray() {
    var arr = [];
    for (var {
      query,
      rules,
      children
    } of this.getSortedRuleset()) {
      var selectors = {};
      for (var rule of rules) {
        selectors[rule.selector] = _objectSpread2(_objectSpread2({}, selectors[rule.selector]), rule.rule);
      }
      Object.assign(selectors, ...children.renderToArray());
      arr.push({
        [query]: selectors
      });
    }
    return arr;
  }
}

var simplePseudoMap = {
  ':-moz-any-link': true,
  ':-moz-full-screen': true,
  ':-moz-placeholder': true,
  ':-moz-read-only': true,
  ':-moz-read-write': true,
  ':-ms-fullscreen': true,
  ':-ms-input-placeholder': true,
  ':-webkit-any-link': true,
  ':-webkit-full-screen': true,
  '::-moz-color-swatch': true,
  '::-moz-list-bullet': true,
  '::-moz-list-number': true,
  '::-moz-page-sequence': true,
  '::-moz-page': true,
  '::-moz-placeholder': true,
  '::-moz-progress-bar': true,
  '::-moz-range-progress': true,
  '::-moz-range-thumb': true,
  '::-moz-range-track': true,
  '::-moz-scrolled-page-sequence': true,
  '::-moz-selection': true,
  '::-ms-backdrop': true,
  '::-ms-browse': true,
  '::-ms-check': true,
  '::-ms-clear': true,
  '::-ms-fill-lower': true,
  '::-ms-fill-upper': true,
  '::-ms-fill': true,
  '::-ms-reveal': true,
  '::-ms-thumb': true,
  '::-ms-ticks-after': true,
  '::-ms-ticks-before': true,
  '::-ms-tooltip': true,
  '::-ms-track': true,
  '::-ms-value': true,
  '::-webkit-backdrop': true,
  '::-webkit-inner-spin-button': true,
  '::-webkit-input-placeholder': true,
  '::-webkit-meter-bar': true,
  '::-webkit-meter-even-less-good-value': true,
  '::-webkit-meter-inner-element': true,
  '::-webkit-meter-optimum-value': true,
  '::-webkit-meter-suboptimum-value': true,
  '::-webkit-outer-spin-button': true,
  '::-webkit-progress-bar': true,
  '::-webkit-progress-inner-element': true,
  '::-webkit-progress-inner-value': true,
  '::-webkit-progress-value': true,
  '::-webkit-resizer': true,
  '::-webkit-scrollbar-button': true,
  '::-webkit-scrollbar-corner': true,
  '::-webkit-scrollbar-thumb': true,
  '::-webkit-scrollbar-track-piece': true,
  '::-webkit-scrollbar-track': true,
  '::-webkit-scrollbar': true,
  '::-webkit-search-cancel-button': true,
  '::-webkit-search-results-button': true,
  '::-webkit-slider-runnable-track': true,
  '::-webkit-slider-thumb': true,
  '::after': true,
  '::backdrop': true,
  '::before': true,
  '::cue': true,
  '::file-selector-button': true,
  '::first-letter': true,
  '::first-line': true,
  '::grammar-error': true,
  '::marker': true,
  '::placeholder': true,
  '::selection': true,
  '::spelling-error': true,
  '::target-text': true,
  '::view-transition-group': true,
  '::view-transition-image-pair': true,
  '::view-transition-new': true,
  '::view-transition-old': true,
  '::view-transition': true,
  ':active': true,
  ':after': true,
  ':any-link': true,
  ':before': true,
  ':blank': true,
  ':checked': true,
  ':default': true,
  ':defined': true,
  ':disabled': true,
  ':empty': true,
  ':enabled': true,
  ':first-child': true,
  ':first-letter': true,
  ':first-line': true,
  ':first-of-type': true,
  ':first': true,
  ':focus-visible': true,
  ':focus-within': true,
  ':focus': true,
  ':fullscreen': true,
  ':hover': true,
  ':in-range': true,
  ':indeterminate': true,
  ':invalid': true,
  ':last-child': true,
  ':last-of-type': true,
  ':left': true,
  ':link': true,
  ':only-child': true,
  ':only-of-type': true,
  ':optional': true,
  ':out-of-range': true,
  ':placeholder-shown': true,
  ':read-only': true,
  ':read-write': true,
  ':required': true,
  ':right': true,
  ':root': true,
  ':scope': true,
  ':target': true,
  ':valid': true,
  ':visited': true
};
var simplePseudos = Object.keys(simplePseudoMap);
var simplePseudoLookup = simplePseudoMap;

var _templateObject;
var createMediaQueryError = (mediaQuery, msg) => new Error(dedent__default["default"](_templateObject || (_templateObject = taggedTemplateLiteral._taggedTemplateLiteral(["\n    Invalid media query: \"", "\"\n\n    ", "\n\n    Read more on MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries\n  "])), mediaQuery, msg));
var validateMediaQuery = mediaQuery => {
  // Empty queries will start with '@media '
  if (mediaQuery === '@media ') {
    throw createMediaQueryError(mediaQuery, 'Query is empty');
  }
  try {
    mediaQueryParser.toAST(mediaQuery);
  } catch (e) {
    throw createMediaQueryError(mediaQuery, e.message);
  }
};

var _excluded = ["vars"],
  _excluded2 = ["content"];
var DECLARATION = '__DECLARATION';
var UNITLESS = {
  animationIterationCount: true,
  borderImage: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexShrink: true,
  fontWeight: true,
  gridArea: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnStart: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowStart: true,
  initialLetter: true,
  lineClamp: true,
  lineHeight: true,
  maxLines: true,
  opacity: true,
  order: true,
  orphans: true,
  scale: true,
  tabSize: true,
  WebkitLineClamp: true,
  widows: true,
  zIndex: true,
  zoom: true,
  // svg properties
  fillOpacity: true,
  floodOpacity: true,
  maskBorder: true,
  maskBorderOutset: true,
  maskBorderSlice: true,
  maskBorderWidth: true,
  shapeImageThreshold: true,
  stopOpacity: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};
function dashify(str) {
  return str.replace(/([A-Z])/g, '-$1').replace(/^ms-/, '-ms-').toLowerCase();
}
function replaceBetweenIndexes(target, startIndex, endIndex, replacement) {
  var start = target.slice(0, startIndex);
  var end = target.slice(endIndex);
  return "".concat(start).concat(replacement).concat(end);
}
var DOUBLE_SPACE = '  ';
var specialKeys = [...simplePseudos, '@layer', '@media', '@supports', '@container', 'selectors'];
class Stylesheet {
  constructor(localClassNames, composedClassLists) {
    this.rules = [];
    this.conditionalRulesets = [new ConditionalRuleset()];
    this.fontFaceRules = [];
    this.keyframesRules = [];
    this.localClassNamesMap = new Map(localClassNames.map(localClassName => [localClassName, localClassName]));
    this.localClassNamesSearch = new AhoCorasick__default["default"](localClassNames);
    this.layers = new Map();

    // Class list compositions should be priortized by Newer > Older
    // Therefore we reverse the array as they are added in sequence
    this.composedClassLists = composedClassLists.map(_ref => {
      var {
        identifier,
        classList
      } = _ref;
      return {
        identifier,
        regex: RegExp("(".concat(classList, ")"), 'g')
      };
    }).reverse();
  }
  processCssObj(root) {
    if (root.type === 'fontFace') {
      this.fontFaceRules.push(root.rule);
      return;
    }
    if (root.type === 'keyframes') {
      root.rule = Object.fromEntries(Object.entries(root.rule).map(_ref2 => {
        var [keyframe, rule] = _ref2;
        return [keyframe, this.transformProperties(rule)];
      }));
      this.keyframesRules.push(root);
      return;
    }
    this.currConditionalRuleset = new ConditionalRuleset();
    if (root.type === 'layer') {
      var layerDefinition = "@layer ".concat(root.name);
      this.addLayer([layerDefinition]);
    } else {
      // Add main styles
      var mainRule = omit(root.rule, specialKeys);
      this.addRule({
        selector: root.selector,
        rule: mainRule
      });
      this.transformLayer(root, root.rule['@layer']);
      this.transformMedia(root, root.rule['@media']);
      this.transformSupports(root, root.rule['@supports']);
      this.transformContainer(root, root.rule['@container']);
      this.transformSimplePseudos(root, root.rule);
      this.transformSelectors(root, root.rule);
    }
    var activeConditionalRuleset = this.conditionalRulesets[this.conditionalRulesets.length - 1];
    if (!activeConditionalRuleset.mergeIfCompatible(this.currConditionalRuleset)) {
      // Ruleset merge failed due to incompatibility. We now deopt by starting a fresh ConditionalRuleset
      this.conditionalRulesets.push(this.currConditionalRuleset);
    }
  }
  addConditionalRule(cssRule, conditions) {
    // Run `transformProperties` before `transformVars` as we don't want to pixelify CSS Vars
    var rule = this.transformVars(this.transformProperties(cssRule.rule));
    var selector = this.transformSelector(cssRule.selector);
    if (!this.currConditionalRuleset) {
      throw new Error("Couldn't add conditional rule");
    }
    var conditionQuery = conditions[conditions.length - 1];
    var parentConditions = conditions.slice(0, conditions.length - 1);
    this.currConditionalRuleset.addRule({
      selector,
      rule
    }, conditionQuery, parentConditions);
  }
  addRule(cssRule) {
    // Run `transformProperties` before `transformVars` as we don't want to pixelify CSS Vars
    var rule = this.transformVars(this.transformProperties(cssRule.rule));
    var selector = this.transformSelector(cssRule.selector);
    this.rules.push({
      selector,
      rule
    });
  }
  addLayer(layer) {
    var uniqueLayerKey = layer.join(' - ');
    this.layers.set(uniqueLayerKey, layer);
  }
  transformProperties(cssRule) {
    return this.transformContent(this.pixelifyProperties(cssRule));
  }
  pixelifyProperties(cssRule) {
    forEach(cssRule, (value, key) => {
      if (typeof value === 'number' && value !== 0 && !UNITLESS[key]) {
        // @ts-expect-error Any ideas?
        cssRule[key] = "".concat(value, "px");
      }
    });
    return cssRule;
  }
  transformVars(_ref3) {
    var {
        vars
      } = _ref3,
      rest = _objectWithoutProperties(_ref3, _excluded);
    if (!vars) {
      return rest;
    }
    return _objectSpread2(_objectSpread2({}, mapKeys(vars, (_value, key) => _private.getVarName(key))), rest);
  }
  transformContent(_ref4) {
    var {
        content
      } = _ref4,
      rest = _objectWithoutProperties(_ref4, _excluded2);
    if (typeof content === 'undefined') {
      return rest;
    }

    // Handle fallback arrays:
    var contentArray = Array.isArray(content) ? content : [content];
    return _objectSpread2({
      content: contentArray.map(value =>
      // This logic was adapted from Stitches :)
      value && (value.includes('"') || value.includes("'") || /^([A-Za-z\-]+\([^]*|[^]*-quote|inherit|initial|none|normal|revert|unset)(\s|$)/.test(value)) ? value : "\"".concat(value, "\""))
    }, rest);
  }
  transformClassname(identifier) {
    return ".".concat(cssesc__default["default"](identifier, {
      isIdentifier: true
    }));
  }
  transformSelector(selector) {
    // Map class list compositions to single identifiers
    var transformedSelector = selector;
    var _loop = function _loop(identifier) {
      transformedSelector = transformedSelector.replace(regex, () => {
        adapter_dist_vanillaExtractCssAdapter.markCompositionUsed(identifier);
        return identifier;
      });
    };
    for (var {
      identifier,
      regex
    } of this.composedClassLists) {
      _loop(identifier);
    }
    if (this.localClassNamesMap.has(transformedSelector)) {
      return this.transformClassname(transformedSelector);
    }
    var results = this.localClassNamesSearch.search(transformedSelector);
    var lastReplaceIndex = transformedSelector.length;

    // Perform replacements backwards to simplify index handling
    for (var i = results.length - 1; i >= 0; i--) {
      var [endIndex, [firstMatch]] = results[i];
      var startIndex = endIndex - firstMatch.length + 1;
      if (startIndex >= lastReplaceIndex) {
        // Class names can be substrings of other class names
        // e.g. '_1g1ptzo1' and '_1g1ptzo10'
        // If the startIndex >= lastReplaceIndex, then
        // this is the case and this replace should be skipped
        continue;
      }
      lastReplaceIndex = startIndex;

      // If class names already starts with a '.' then skip
      if (transformedSelector[startIndex - 1] !== '.') {
        transformedSelector = replaceBetweenIndexes(transformedSelector, startIndex, endIndex + 1, this.transformClassname(firstMatch));
      }
    }
    return transformedSelector;
  }
  transformSelectors(root, rule, conditions) {
    forEach(rule.selectors, (selectorRule, selector) => {
      if (root.type !== 'local') {
        throw new Error("Selectors are not allowed within ".concat(root.type === 'global' ? '"globalStyle"' : '"selectors"'));
      }
      var transformedSelector = this.transformSelector(selector.replace(RegExp('&', 'g'), root.selector));
      validateSelector(transformedSelector, root.selector);
      var rule = {
        selector: transformedSelector,
        rule: omit(selectorRule, specialKeys)
      };
      if (conditions) {
        this.addConditionalRule(rule, conditions);
      } else {
        this.addRule(rule);
      }
      var selectorRoot = {
        type: 'selector',
        selector: transformedSelector,
        rule: selectorRule
      };
      this.transformLayer(selectorRoot, selectorRule['@layer'], conditions);
      this.transformSupports(selectorRoot, selectorRule['@supports'], conditions);
      this.transformMedia(selectorRoot, selectorRule['@media'], conditions);
    });
  }
  transformMedia(root, rules) {
    var parentConditions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    if (rules) {
      var _this$currConditional;
      (_this$currConditional = this.currConditionalRuleset) === null || _this$currConditional === void 0 || _this$currConditional.addConditionPrecedence(parentConditions, Object.keys(rules).map(query => "@media ".concat(query)));
      for (var [query, mediaRule] of Object.entries(rules)) {
        var mediaQuery = "@media ".concat(query);
        validateMediaQuery(mediaQuery);
        var conditions = [...parentConditions, mediaQuery];
        this.addConditionalRule({
          selector: root.selector,
          rule: omit(mediaRule, specialKeys)
        }, conditions);
        if (root.type === 'local') {
          this.transformSimplePseudos(root, mediaRule, conditions);
          this.transformSelectors(root, mediaRule, conditions);
        }
        this.transformLayer(root, mediaRule['@layer'], conditions);
        this.transformSupports(root, mediaRule['@supports'], conditions);
        this.transformContainer(root, mediaRule['@container'], conditions);
      }
    }
  }
  transformContainer(root, rules) {
    var parentConditions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    if (rules) {
      var _this$currConditional2;
      (_this$currConditional2 = this.currConditionalRuleset) === null || _this$currConditional2 === void 0 || _this$currConditional2.addConditionPrecedence(parentConditions, Object.keys(rules).map(query => "@container ".concat(query)));
      forEach(rules, (containerRule, query) => {
        var containerQuery = "@container ".concat(query);
        var conditions = [...parentConditions, containerQuery];
        this.addConditionalRule({
          selector: root.selector,
          rule: omit(containerRule, specialKeys)
        }, conditions);
        if (root.type === 'local') {
          this.transformSimplePseudos(root, containerRule, conditions);
          this.transformSelectors(root, containerRule, conditions);
        }
        this.transformLayer(root, containerRule['@layer'], conditions);
        this.transformSupports(root, containerRule['@supports'], conditions);
        this.transformMedia(root, containerRule['@media'], conditions);
      });
    }
  }
  transformLayer(root, rules) {
    var parentConditions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    if (rules) {
      var _this$currConditional3;
      (_this$currConditional3 = this.currConditionalRuleset) === null || _this$currConditional3 === void 0 || _this$currConditional3.addConditionPrecedence(parentConditions, Object.keys(rules).map(name => "@layer ".concat(name)));
      forEach(rules, (layerRule, name) => {
        var conditions = [...parentConditions, "@layer ".concat(name)];
        this.addLayer(conditions);
        this.addConditionalRule({
          selector: root.selector,
          rule: omit(layerRule, specialKeys)
        }, conditions);
        if (root.type === 'local') {
          this.transformSimplePseudos(root, layerRule, conditions);
          this.transformSelectors(root, layerRule, conditions);
        }
        this.transformMedia(root, layerRule['@media'], conditions);
        this.transformSupports(root, layerRule['@supports'], conditions);
        this.transformContainer(root, layerRule['@container'], conditions);
      });
    }
  }
  transformSupports(root, rules) {
    var parentConditions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    if (rules) {
      var _this$currConditional4;
      (_this$currConditional4 = this.currConditionalRuleset) === null || _this$currConditional4 === void 0 || _this$currConditional4.addConditionPrecedence(parentConditions, Object.keys(rules).map(query => "@supports ".concat(query)));
      forEach(rules, (supportsRule, query) => {
        var conditions = [...parentConditions, "@supports ".concat(query)];
        this.addConditionalRule({
          selector: root.selector,
          rule: omit(supportsRule, specialKeys)
        }, conditions);
        if (root.type === 'local') {
          this.transformSimplePseudos(root, supportsRule, conditions);
          this.transformSelectors(root, supportsRule, conditions);
        }
        this.transformLayer(root, supportsRule['@layer'], conditions);
        this.transformMedia(root, supportsRule['@media'], conditions);
        this.transformContainer(root, supportsRule['@container'], conditions);
      });
    }
  }
  transformSimplePseudos(root, rule, conditions) {
    for (var key of Object.keys(rule)) {
      // Process simple pseudos
      if (simplePseudoLookup[key]) {
        if (root.type !== 'local') {
          throw new Error("Simple pseudos are not valid in ".concat(root.type === 'global' ? '"globalStyle"' : '"selectors"'));
        }
        if (conditions) {
          this.addConditionalRule({
            selector: "".concat(root.selector).concat(key),
            rule: rule[key]
          }, conditions);
        } else {
          this.addRule({
            conditions,
            selector: "".concat(root.selector).concat(key),
            rule: rule[key]
          });
        }
      }
    }
  }
  toCss() {
    var css = [];

    // Render font-face rules
    for (var fontFaceRule of this.fontFaceRules) {
      css.push(renderCss({
        '@font-face': fontFaceRule
      }));
    }

    // Render keyframes
    for (var keyframe of this.keyframesRules) {
      css.push(renderCss({
        ["@keyframes ".concat(keyframe.name)]: keyframe.rule
      }));
    }

    // Render layer definitions
    for (var layer of this.layers.values()) {
      var [definition, ...nesting] = layer.reverse();
      var cssObj = {
        [definition]: DECLARATION
      };
      for (var part of nesting) {
        cssObj = {
          [part]: cssObj
        };
      }
      css.push(renderCss(cssObj));
    }

    // Render unconditional rules
    for (var rule of this.rules) {
      css.push(renderCss({
        [rule.selector]: rule.rule
      }));
    }

    // Render conditional rules
    for (var conditionalRuleset of this.conditionalRulesets) {
      for (var conditionalRule of conditionalRuleset.renderToArray()) {
        css.push(renderCss(conditionalRule));
      }
    }
    return css.filter(Boolean);
  }
}
function renderCss(v) {
  var indent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var rules = [];
  var _loop2 = function _loop2(key) {
    var value = v[key];
    if (value && Array.isArray(value)) {
      rules.push(...value.map(v => renderCss({
        [key]: v
      }, indent)));
    } else if (value && typeof value === 'object') {
      var isEmpty = Object.keys(value).length === 0;
      if (!isEmpty) {
        rules.push("".concat(indent).concat(key, " {\n").concat(renderCss(value, indent + DOUBLE_SPACE), "\n").concat(indent, "}"));
      }
    } else if (value === DECLARATION) {
      rules.push("".concat(indent).concat(key, ";"));
    } else {
      rules.push("".concat(indent).concat(key.startsWith('--') ? key : dashify(key), ": ").concat(value, ";"));
    }
  };
  for (var key of Object.keys(v)) {
    _loop2(key);
  }
  return rules.join('\n');
}
function transformCss(_ref5) {
  var {
    localClassNames,
    cssObjs,
    composedClassLists
  } = _ref5;
  var stylesheet = new Stylesheet(localClassNames, composedClassLists);
  for (var root of cssObjs) {
    stylesheet.processCssObj(root);
  }
  return stylesheet.toCss();
}

exports._objectSpread2 = _objectSpread2;
exports.dudupeAndJoinClassList = dudupeAndJoinClassList;
exports.transformCss = transformCss;
