'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mockAdapter = {
  appendCss: () => {},
  registerClassName: () => {},
  onEndFileScope: () => {},
  registerComposition: () => {},
  markCompositionUsed: () => {},
  getIdentOption: () => 'short' 
};
var adapterStack = [mockAdapter];
var currentAdapter = () => {
  if (adapterStack.length < 1) {
    throw new Error('No adapter configured');
  }
  return adapterStack[adapterStack.length - 1];
};
var hasConfiguredAdapter = false;
var setAdapterIfNotSet = newAdapter => {
  if (!hasConfiguredAdapter) {
    setAdapter(newAdapter);
  }
};
var setAdapter = newAdapter => {
  if (!newAdapter) {
    throw new Error('No adapter provided when calling "setAdapter"');
  }
  hasConfiguredAdapter = true;
  adapterStack.push(newAdapter);
};
var removeAdapter = () => {
  adapterStack.pop();
};
var appendCss = function appendCss() {
  return currentAdapter().appendCss(...arguments);
};
var registerClassName = function registerClassName() {
  return currentAdapter().registerClassName(...arguments);
};
var registerComposition = function registerComposition() {
  return currentAdapter().registerComposition(...arguments);
};
var markCompositionUsed = function markCompositionUsed() {
  return currentAdapter().markCompositionUsed(...arguments);
};
var onBeginFileScope = function onBeginFileScope() {
  var _currentAdapter$onBeg, _currentAdapter;
  for (var _len = arguments.length, props = new Array(_len), _key = 0; _key < _len; _key++) {
    props[_key] = arguments[_key];
  }
  return (_currentAdapter$onBeg = (_currentAdapter = currentAdapter()).onBeginFileScope) === null || _currentAdapter$onBeg === void 0 ? void 0 : _currentAdapter$onBeg.call(_currentAdapter, ...props);
};
var onEndFileScope = function onEndFileScope() {
  return currentAdapter().onEndFileScope(...arguments);
};
var getIdentOption = function getIdentOption() {
  var adapter = currentAdapter();

  // Backwards compatibility with old versions of the integration package
  if (!('getIdentOption' in adapter)) {
    return 'short' ;
  }
  return adapter.getIdentOption(...arguments);
};

exports.appendCss = appendCss;
exports.getIdentOption = getIdentOption;
exports.markCompositionUsed = markCompositionUsed;
exports.mockAdapter = mockAdapter;
exports.onBeginFileScope = onBeginFileScope;
exports.onEndFileScope = onEndFileScope;
exports.registerClassName = registerClassName;
exports.registerComposition = registerComposition;
exports.removeAdapter = removeAdapter;
exports.setAdapter = setAdapter;
exports.setAdapterIfNotSet = setAdapterIfNotSet;
