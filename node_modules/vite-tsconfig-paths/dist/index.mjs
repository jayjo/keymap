// src/index.ts
import _debug from "debug";
import * as fs from "fs";
import globRex from "globrex";
import { resolve as resolve3 } from "path";
import { inspect } from "util";
import { normalizePath as normalizePath2, searchForWorkspaceRoot } from "vite";

// src/mappings.ts
import { resolve } from "path";
function resolvePathMappings(paths, base) {
  const sortedPatterns = Object.keys(paths).sort(
    (a, b) => getPrefixLength(b) - getPrefixLength(a)
  );
  const resolved = [];
  for (let pattern of sortedPatterns) {
    const relativePaths = paths[pattern];
    pattern = escapeStringRegexp(pattern).replace(/\*/g, "(.+)");
    resolved.push({
      pattern: new RegExp("^" + pattern + "$"),
      paths: relativePaths.map((relativePath) => resolve(base, relativePath))
    });
  }
  return resolved;
}
function getPrefixLength(pattern) {
  const prefixLength = pattern.indexOf("*");
  return pattern.substr(0, prefixLength).length;
}
function escapeStringRegexp(string) {
  return string.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/-/g, "\\x2d");
}

// src/path.ts
import * as os from "os";
import * as path from "path";
import { normalizePath } from "vite";
import { dirname } from "path";
var isWindows = os.platform() == "win32";
var resolve2 = isWindows ? (...paths) => normalizePath(path.win32.resolve(...paths)) : path.posix.resolve;
var isAbsolute = isWindows ? path.win32.isAbsolute : path.posix.isAbsolute;
var join = path.posix.join;
var relative = path.posix.relative;
var basename = path.posix.basename;

// src/index.ts
var debug = _debug("vite-tsconfig-paths");
var noMatch = [void 0, false];
var src_default = (opts = {}) => {
  let resolversByDir;
  return {
    name: "vite-tsconfig-paths",
    enforce: "pre",
    async configResolved(config) {
      let projectRoot = config.root;
      let workspaceRoot;
      let { root } = opts;
      if (root) {
        root = resolve3(projectRoot, root);
      } else {
        workspaceRoot = searchForWorkspaceRoot(projectRoot);
      }
      debug("options.root   ==", root);
      debug("project root   ==", projectRoot);
      debug("workspace root ==", workspaceRoot);
      if (root) {
        projectRoot = root;
        workspaceRoot = root;
      }
      const tsconfck = await import("tsconfck");
      const projects = opts.projects ? opts.projects.map((file) => {
        if (!file.endsWith(".json")) {
          file = join(file, "tsconfig.json");
        }
        return resolve3(projectRoot, file);
      }) : await tsconfck.findAll(workspaceRoot, {
        configNames: opts.configNames || ["tsconfig.json", "jsconfig.json"],
        skip(dir) {
          return dir == "node_modules" || dir == ".git";
        }
      });
      debug("projects:", projects);
      let hasTypeScriptDep = false;
      if (opts.parseNative) {
        try {
          const pkgJson = fs.readFileSync(
            join(workspaceRoot, "package.json"),
            "utf8"
          );
          const pkg = JSON.parse(pkgJson);
          const deps = { ...pkg.dependencies, ...pkg.devDependencies };
          hasTypeScriptDep = "typescript" in deps;
        } catch (e) {
          if (e.code != "ENOENT") {
            throw e;
          }
        }
      }
      let firstError;
      const parseOptions = {
        cache: new tsconfck.TSConfckCache()
      };
      const parsedProjects = new Set(
        await Promise.all(
          projects.map((tsconfigFile) => {
            if (tsconfigFile === null) {
              debug("tsconfig file not found:", tsconfigFile);
              return null;
            }
            return (hasTypeScriptDep ? tsconfck.parseNative(tsconfigFile, parseOptions) : tsconfck.parse(tsconfigFile, parseOptions)).catch((error) => {
              if (opts.ignoreConfigErrors) {
                debug("tsconfig file caused a parsing error:", tsconfigFile);
              } else {
                config.logger.error(
                  '[tsconfig-paths] An error occurred while parsing "' + tsconfigFile + '". See below for details.' + (firstError ? "" : " To disable this message, set the `ignoreConfigErrors` option to true."),
                  { error }
                );
                if (config.logger.hasErrorLogged(error)) {
                  console.error(error);
                }
                firstError = error;
              }
              return null;
            });
          })
        )
      );
      resolversByDir = {};
      parsedProjects.forEach((project) => {
        if (!project) {
          return;
        }
        if (project.referenced) {
          project.referenced.forEach((projectRef) => {
            parsedProjects.add(projectRef);
          });
          parsedProjects.delete(project);
          parsedProjects.add(project);
          project.referenced = void 0;
        } else {
          const resolver = createResolver(project);
          if (resolver) {
            const projectDir = normalizePath2(dirname(project.tsconfigFile));
            const resolvers = resolversByDir[projectDir] || (resolversByDir[projectDir] = []);
            resolvers.push(resolver);
          }
        }
      });
    },
    async resolveId(id, importer, options) {
      if (importer && !relativeImportRE.test(id) && !isAbsolute(id)) {
        const resolveOptions = { ...options, skipSelf: true };
        const viteResolve = async (id2, importer2) => {
          var _a;
          return (_a = await this.resolve(id2, importer2, resolveOptions)) == null ? void 0 : _a.id;
        };
        let prevProjectDir;
        let projectDir = dirname(importer);
        loop:
          while (projectDir && projectDir != prevProjectDir) {
            const resolvers = resolversByDir[projectDir];
            if (resolvers)
              for (const resolve4 of resolvers) {
                const [resolved, matched] = await resolve4(
                  viteResolve,
                  id,
                  importer
                );
                if (resolved) {
                  return resolved;
                }
                if (matched) {
                  break loop;
                }
              }
            prevProjectDir = projectDir;
            projectDir = dirname(prevProjectDir);
          }
      }
    }
  };
  function createResolver(project) {
    var _a, _b;
    const configPath = normalizePath2(project.tsconfigFile);
    const config = project.tsconfig;
    debug("config loaded:", inspect({ configPath, config }, false, 10, true));
    if (((_a = config.files) == null ? void 0 : _a.length) == 0 && !((_b = config.include) == null ? void 0 : _b.length)) {
      debug(
        `[!] skipping "${configPath}" as no files can be matched since "files" is empty and "include" is missing or empty`
      );
      return null;
    }
    const options = config.compilerOptions || {};
    const { baseUrl, paths } = options;
    if (!baseUrl && !paths) {
      debug(`[!] missing baseUrl and paths: "${configPath}"`);
      return null;
    }
    const resolveWithBaseUrl = baseUrl ? (viteResolve, id, importer) => viteResolve(join(baseUrl, id), importer) : void 0;
    let resolveId;
    if (paths) {
      const pathMappings = resolvePathMappings(
        paths,
        baseUrl != null ? baseUrl : dirname(configPath)
      );
      const resolveWithPaths = async (viteResolve, id, importer) => {
        for (const mapping of pathMappings) {
          const match = id.match(mapping.pattern);
          if (!match) {
            continue;
          }
          for (let pathTemplate of mapping.paths) {
            let starCount = 0;
            const mappedId = pathTemplate.replace(/\*/g, () => {
              const matchIndex = Math.min(++starCount, match.length - 1);
              return match[matchIndex];
            });
            const resolved = await viteResolve(mappedId, importer);
            if (resolved) {
              return resolved;
            }
          }
        }
      };
      if (resolveWithBaseUrl) {
        resolveId = (viteResolve, id, importer) => resolveWithPaths(viteResolve, id, importer).then((resolved) => {
          return resolved != null ? resolved : resolveWithBaseUrl(viteResolve, id, importer);
        });
      } else {
        resolveId = resolveWithPaths;
      }
    } else {
      resolveId = resolveWithBaseUrl;
    }
    const configDir = dirname(configPath);
    let { outDir } = options;
    if (outDir && isAbsolute(outDir)) {
      outDir = relative(configDir, outDir);
    }
    const isIncludedRelative = getIncluder(
      config.include,
      config.exclude,
      outDir
    );
    const importerExtRE = opts.loose ? /./ : options.allowJs || basename(configPath).startsWith("jsconfig.") ? jsLikeRE : /\.[mc]?tsx?$/;
    const resolutionCache = /* @__PURE__ */ new Map();
    return async (viteResolve, id, importer) => {
      var _a2;
      if (id.includes("\0")) {
        return noMatch;
      }
      importer = normalizePath2(importer);
      const importerFile = importer.replace(/[#?].+$/, "");
      if (!importerExtRE.test(importerFile)) {
        return noMatch;
      }
      const relativeImporterFile = relative(configDir, importerFile);
      if (!isIncludedRelative(relativeImporterFile)) {
        return noMatch;
      }
      const suffix = (_a2 = /\?.+$/.exec(id)) == null ? void 0 : _a2[0];
      if (suffix) {
        id = id.slice(0, -suffix.length);
      }
      let path2 = resolutionCache.get(id);
      if (!path2) {
        path2 = await resolveId(viteResolve, id, importer);
        if (path2) {
          resolutionCache.set(id, path2);
          debug(`resolved:`, {
            id,
            importer,
            resolvedId: path2,
            configPath
          });
        }
      }
      return [path2 && suffix ? path2 + suffix : path2, true];
    };
  }
};
var jsLikeRE = /\.(vue|svelte|mdx|[mc]?[jt]sx?)$/;
var relativeImportRE = /^\.\.?(\/|$)/;
var defaultInclude = ["**/*"];
var defaultExclude = [
  "**/node_modules",
  "**/bower_components",
  "**/jspm_packages"
];
function getIncluder(includePaths = defaultInclude, excludePaths = defaultExclude, outDir) {
  if (outDir) {
    excludePaths = excludePaths.concat(outDir);
  }
  if (includePaths.length || excludePaths.length) {
    const includers = [];
    const excluders = [];
    includePaths.forEach(addCompiledGlob, includers);
    excludePaths.forEach(addCompiledGlob, excluders);
    debug(`compiled globs:`, { includers, excluders });
    return (path2) => {
      path2 = path2.replace(/\?.+$/, "");
      if (!relativeImportRE.test(path2)) {
        path2 = "./" + path2;
      }
      const test = (glob) => glob.test(path2);
      return includers.some(test) && !excluders.some(test);
    };
  }
  return () => true;
}
function addCompiledGlob(glob) {
  const endsWithGlob = glob.split("/").pop().includes("*");
  const relativeGlob = relativeImportRE.test(glob) ? glob : "./" + glob;
  if (endsWithGlob) {
    this.push(compileGlob(relativeGlob));
  } else {
    this.push(compileGlob(relativeGlob + "/**"));
    if (/\.\w+$/.test(glob)) {
      this.push(compileGlob(relativeGlob));
    }
  }
}
function compileGlob(glob) {
  return globRex(glob, {
    extended: true,
    globstar: true
  }).regex;
}
export {
  src_default as default
};
//# sourceMappingURL=index.mjs.map