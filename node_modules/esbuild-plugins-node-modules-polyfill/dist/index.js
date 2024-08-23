'use strict';

var module$1 = require('module');
var path = require('path');
var process = require('process');
var localPkg = require('local-pkg');
var promises = require('fs/promises');
var resolve_exports = require('resolve.exports');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var path__default = /*#__PURE__*/_interopDefault(path);
var process__default = /*#__PURE__*/_interopDefault(process);

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// src/lib/utils/util.ts
var escapeRegex = /* @__PURE__ */ __name((str) => str.replace(/[$()*+.?[\\\]^{|}]/g, "\\$&").replace(/-/g, "\\x2d"), "escapeRegex");
var commonJsTemplate = /* @__PURE__ */ __name(({ importPath }) => `export * from '${importPath}'`, "commonJsTemplate");
var normalizeNodeBuiltinPath = /* @__PURE__ */ __name((path2) => path2.replace(/^node:/, "").replace(/\/$/, ""), "normalizeNodeBuiltinPath");
async function polyfillPath(importPath) {
  if (!module$1.builtinModules.includes(importPath))
    throw new Error(`Node.js does not have ${importPath} in its builtin modules`);
  const jspmPath = path.resolve(
    __require.resolve(`@jspm/core/nodelibs/${importPath}`),
    // ensure sub path modules are resolved properly
    "../../.." + (importPath.includes("/") ? "/.." : "")
  );
  const jspmPackageJson = await localPkg.loadPackageJSON(jspmPath);
  const exportPath = resolve_exports.resolve(jspmPackageJson, `./nodelibs/${importPath}`, {
    browser: true
  });
  const exportFullPath = localPkg.resolveModule(path.join(jspmPath, exportPath?.[0] ?? ""));
  if (!exportPath || !exportFullPath) {
    throw new Error(
      "resolving failed, please try creating an issue in https://github.com/imranbarbhuiya/esbuild-plugins-node-modules-polyfill"
    );
  }
  return exportFullPath;
}
__name(polyfillPath, "polyfillPath");
var polyfillPathCache = /* @__PURE__ */ new Map();
var getCachedPolyfillPath = /* @__PURE__ */ __name((importPath) => {
  const normalizedImportPath = normalizeNodeBuiltinPath(importPath);
  const cachedPromise = polyfillPathCache.get(normalizedImportPath);
  if (cachedPromise) return cachedPromise;
  const promise = polyfillPath(normalizedImportPath);
  polyfillPathCache.set(normalizedImportPath, promise);
  return promise;
}, "getCachedPolyfillPath");
var polyfillContentAndTransform = /* @__PURE__ */ __name(async (importPath) => {
  const exportFullPath = await getCachedPolyfillPath(importPath);
  const content = await promises.readFile(exportFullPath, "utf8");
  return content.replace(/eval\(/g, "(0,eval)(");
}, "polyfillContentAndTransform");
var polyfillContentCache = /* @__PURE__ */ new Map();
var getCachedPolyfillContent = /* @__PURE__ */ __name((_importPath) => {
  const normalizedImportPath = normalizeNodeBuiltinPath(_importPath);
  const cachedPromise = polyfillContentCache.get(normalizedImportPath);
  if (cachedPromise) return cachedPromise;
  const promise = polyfillContentAndTransform(normalizedImportPath);
  polyfillContentCache.set(normalizedImportPath, promise);
  return promise;
}, "getCachedPolyfillContent");

// src/lib/plugin.ts
var NAME = "node-modules-polyfills";
var loader = /* @__PURE__ */ __name(async (args) => {
  try {
    const isCommonjs = args.namespace.endsWith("commonjs");
    const resolved = await getCachedPolyfillPath(args.path);
    const resolveDir = path__default.default.dirname(resolved);
    if (isCommonjs) {
      return {
        loader: "js",
        contents: commonJsTemplate({
          importPath: args.path
        }),
        resolveDir
      };
    }
    const contents = await getCachedPolyfillContent(args.path);
    return {
      loader: "js",
      contents,
      resolveDir
    };
  } catch (error) {
    console.error("node-modules-polyfill", error);
    return {
      contents: `export {}`,
      loader: "js"
    };
  }
}, "loader");
var nodeModulesPolyfillPlugin = /* @__PURE__ */ __name((options = {}) => {
  const {
    globals = {},
    modules: modulesOption = module$1.builtinModules,
    fallback = "none",
    formatError,
    namespace = NAME,
    name = NAME
  } = options;
  if (namespace.endsWith("commonjs")) throw new Error(`namespace ${namespace} must not end with commonjs`);
  if (namespace.endsWith("empty")) throw new Error(`namespace ${namespace} must not end with empty`);
  if (namespace.endsWith("error")) throw new Error(`namespace ${namespace} must not end with error`);
  const modules = Array.isArray(modulesOption) ? Object.fromEntries(modulesOption.map((mod) => [mod, true])) : modulesOption;
  const commonjsNamespace = `${namespace}-commonjs`;
  const emptyNamespace = `${namespace}-empty`;
  const errorNamespace = `${namespace}-error`;
  const shouldDetectErrorModules = fallback === "error" || Object.values(modules).includes("error");
  return {
    name,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    setup: /* @__PURE__ */ __name(({ onLoad, onResolve, onEnd, initialOptions }) => {
      if (shouldDetectErrorModules && initialOptions.write !== false)
        throw new Error(`The "write" build option must be set to false when using the "error" polyfill type`);
      const root = initialOptions.absWorkingDir ?? process__default.default.cwd();
      if (initialOptions.define && !initialOptions.define.global) initialOptions.define.global = "globalThis";
      else if (!initialOptions.define) initialOptions.define = { global: "globalThis" };
      initialOptions.inject = initialOptions.inject ?? [];
      if (globals.Buffer) initialOptions.inject.push(path__default.default.resolve(__dirname, "../globals/Buffer.js"));
      if (globals.process) initialOptions.inject.push(path__default.default.resolve(__dirname, "../globals/process.js"));
      onLoad({ filter: /.*/, namespace: emptyNamespace }, () => ({
        loader: "js",
        // Use an empty CommonJS module here instead of ESM to avoid
        // "No matching export" errors in esbuild for anything that
        // is imported from this file.
        contents: "module.exports = {}"
      }));
      onLoad({ filter: /.*/, namespace: errorNamespace }, (args) => ({
        loader: "js",
        contents: `module.exports = ${JSON.stringify(
          // This encoded string is detected and parsed at the end of the build to report errors
          `__POLYFILL_ERROR_START__::MODULE::${args.path}::IMPORTER::${args.pluginData.importer}::__POLYFILL_ERROR_END__`
        )}`
      }));
      onLoad({ filter: /.*/, namespace }, loader);
      onLoad({ filter: /.*/, namespace: commonjsNamespace }, loader);
      const bundledModules = fallback === "none" ? Object.keys(modules).filter((moduleName) => module$1.builtinModules.includes(moduleName)) : module$1.builtinModules;
      const filter = new RegExp(`^(?:node:)?(?:${bundledModules.map(escapeRegex).join("|")})$`);
      const resolver = /* @__PURE__ */ __name(async (args) => {
        const result = {
          empty: {
            namespace: emptyNamespace,
            path: args.path,
            sideEffects: false
          },
          error: {
            namespace: errorNamespace,
            path: args.path,
            sideEffects: false,
            pluginData: {
              importer: path__default.default.relative(root, args.importer).replace(/\\/g, "/")
            }
          },
          none: void 0
        };
        if (initialOptions.platform === "browser") {
          const packageJson = await localPkg.loadPackageJSON(args.resolveDir);
          const browserFieldValue = packageJson?.browser;
          if (typeof browserFieldValue === "string") return;
          const browserFieldValueForModule = browserFieldValue?.[args.path];
          if (browserFieldValueForModule === false) return result.empty;
          if (browserFieldValueForModule !== void 0) return;
        }
        const moduleName = normalizeNodeBuiltinPath(args.path);
        const polyfillOption = modules[moduleName];
        if (!polyfillOption) return result[fallback];
        if (polyfillOption === "error" || polyfillOption === "empty") return result[polyfillOption];
        const polyfillPath2 = await getCachedPolyfillPath(moduleName).catch(() => null);
        if (!polyfillPath2) return result[fallback];
        const ignoreRequire = args.namespace === commonjsNamespace;
        const isCommonjs = !ignoreRequire && args.kind === "require-call";
        return {
          namespace: isCommonjs ? commonjsNamespace : namespace,
          path: args.path,
          sideEffects: false
        };
      }, "resolver");
      onResolve({ filter }, resolver);
      onEnd(async ({ outputFiles = [] }) => {
        if (!shouldDetectErrorModules) return;
        const errors = [];
        const { outfile, outExtension = {} } = initialOptions;
        const jsExtension = outfile ? path__default.default.extname(outfile) : outExtension[".js"] || ".js";
        const jsFiles = outputFiles.filter((file) => path__default.default.extname(file.path) === jsExtension);
        for (const file of jsFiles) {
          const matches = file.text.matchAll(
            /__POLYFILL_ERROR_START__::MODULE::(?<moduleName>.+?)::IMPORTER::(?<importer>.+?)::__POLYFILL_ERROR_END__/g
          );
          for (const { groups } of matches) {
            const { moduleName, importer } = groups;
            const polyfillExists = await getCachedPolyfillPath(moduleName).catch(() => null) !== null;
            errors.push({
              pluginName: name,
              text: polyfillExists ? `Polyfill has not been configured for "${moduleName}", imported by "${importer}"` : `Polyfill does not exist for "${moduleName}", imported by "${importer}"`,
              ...formatError ? await formatError({ moduleName, importer, polyfillExists }) : {}
            });
          }
        }
        return { errors };
      });
    }, "setup")
  };
}, "nodeModulesPolyfillPlugin");

exports.commonJsTemplate = commonJsTemplate;
exports.escapeRegex = escapeRegex;
exports.nodeModulesPolyfillPlugin = nodeModulesPolyfillPlugin;
exports.normalizeNodeBuiltinPath = normalizeNodeBuiltinPath;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map