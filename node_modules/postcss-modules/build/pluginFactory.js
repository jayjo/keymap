"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makePlugin = makePlugin;

var _postcss = _interopRequireDefault(require("postcss"));

var _unquote = _interopRequireDefault(require("./unquote"));

var _Parser = _interopRequireDefault(require("./Parser"));

var _saveJSON = _interopRequireDefault(require("./saveJSON"));

var _localsConvention = require("./localsConvention");

var _FileSystemLoader = _interopRequireDefault(require("./FileSystemLoader"));

var _scoping = require("./scoping");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PLUGIN_NAME = "postcss-modules";

function isGlobalModule(globalModules, inputFile) {
  return globalModules.some(regex => inputFile.match(regex));
}

function getDefaultPluginsList(opts, inputFile) {
  const globalModulesList = opts.globalModulePaths || null;
  const exportGlobals = opts.exportGlobals || false;
  const defaultBehaviour = (0, _scoping.getDefaultScopeBehaviour)(opts.scopeBehaviour);
  const generateScopedName = (0, _scoping.getScopedNameGenerator)(opts.generateScopedName, opts.hashPrefix);

  if (globalModulesList && isGlobalModule(globalModulesList, inputFile)) {
    return (0, _scoping.getDefaultPlugins)({
      behaviour: _scoping.behaviours.GLOBAL,
      generateScopedName,
      exportGlobals
    });
  }

  return (0, _scoping.getDefaultPlugins)({
    behaviour: defaultBehaviour,
    generateScopedName,
    exportGlobals
  });
}

function getLoader(opts, plugins) {
  const root = typeof opts.root === "undefined" ? "/" : opts.root;
  return typeof opts.Loader === "function" ? new opts.Loader(root, plugins, opts.resolve) : new _FileSystemLoader.default(root, plugins, opts.resolve);
}

function isOurPlugin(plugin) {
  return plugin.postcssPlugin === PLUGIN_NAME;
}

function makePlugin(opts) {
  return {
    postcssPlugin: PLUGIN_NAME,

    async OnceExit(css, {
      result
    }) {
      const getJSON = opts.getJSON || _saveJSON.default;
      const inputFile = css.source.input.file;
      const pluginList = getDefaultPluginsList(opts, inputFile);
      const resultPluginIndex = result.processor.plugins.findIndex(plugin => isOurPlugin(plugin));

      if (resultPluginIndex === -1) {
        throw new Error("Plugin missing from options.");
      }

      const earlierPlugins = result.processor.plugins.slice(0, resultPluginIndex);
      const loaderPlugins = [...earlierPlugins, ...pluginList];
      const loader = getLoader(opts, loaderPlugins);

      const fetcher = async (file, relativeTo, depTrace) => {
        const unquoteFile = (0, _unquote.default)(file);
        return loader.fetch.call(loader, unquoteFile, relativeTo, depTrace);
      };

      const parser = new _Parser.default(fetcher);
      await (0, _postcss.default)([...pluginList, parser.plugin()]).process(css, {
        from: inputFile
      });
      const out = loader.finalSource;
      if (out) css.prepend(out);

      if (opts.localsConvention) {
        const reducer = (0, _localsConvention.makeLocalsConventionReducer)(opts.localsConvention, inputFile);
        parser.exportTokens = Object.entries(parser.exportTokens).reduce(reducer, {});
      }

      result.messages.push({
        type: "export",
        plugin: "postcss-modules",
        exportTokens: parser.exportTokens
      }); // getJSON may return a promise

      return getJSON(css.source.input.file, parser.exportTokens, result.opts.to);
    }

  };
}