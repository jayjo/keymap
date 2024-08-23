import type * as Vite from "vite";
import { type ConfigRoute, type RouteManifest } from "../config/routes";
import { type AppConfig as RemixEsbuildUserConfig, type RemixConfig as ResolvedRemixEsbuildConfig } from "../config";
import { type Manifest as RemixManifest } from "../manifest";
export declare function resolveViteConfig({ configFile, mode, root, }: {
    configFile?: string;
    mode?: string;
    root: string;
}): Promise<Readonly<Omit<Vite.UserConfig, "build" | "css" | "plugins" | "assetsInclude" | "optimizeDeps" | "worker"> & {
    configFile: string | undefined;
    configFileDependencies: string[];
    inlineConfig: Vite.InlineConfig;
    root: string;
    base: string;
    publicDir: string;
    cacheDir: string;
    command: "build" | "serve";
    mode: string;
    isWorker: boolean;
    isProduction: boolean;
    envDir: string;
    env: Record<string, any>;
    resolve: Required<Vite.ResolveOptions> & {
        alias: Vite.Alias[];
    };
    plugins: readonly Vite.Plugin<any>[];
    css: Vite.ResolvedCSSOptions;
    esbuild: false | Vite.ESBuildOptions;
    server: Vite.ResolvedServerOptions;
    build: Vite.ResolvedBuildOptions;
    preview: Vite.ResolvedPreviewOptions;
    ssr: Vite.ResolvedSSROptions;
    assetsInclude: (file: string) => boolean;
    logger: Vite.Logger;
    createResolver: (options?: Partial<Vite.InternalResolveOptions> | undefined) => Vite.ResolveFn;
    optimizeDeps: Vite.DepOptimizationOptions;
    worker: Vite.ResolvedWorkerOptions;
    appType: Vite.AppType;
    experimental: Vite.ExperimentalOptions;
} & Vite.PluginHookUtils>>;
export declare function extractRemixPluginContext(viteConfig: Vite.ResolvedConfig): Promise<RemixPluginContext | undefined>;
export declare function loadVitePluginContext({ configFile, root, }: {
    configFile?: string;
    root?: string;
}): Promise<RemixPluginContext | undefined>;
declare const supportedRemixEsbuildConfigKeys: readonly ["appDirectory", "future", "ignoredRouteFiles", "routes", "serverModuleFormat"];
type SupportedRemixEsbuildUserConfig = Pick<RemixEsbuildUserConfig, typeof supportedRemixEsbuildConfigKeys[number]>;
declare const branchRouteProperties: readonly ["id", "path", "file", "index"];
type BranchRoute = Pick<ConfigRoute, typeof branchRouteProperties[number]>;
export declare const configRouteToBranchRoute: (configRoute: ConfigRoute) => BranchRoute;
export type ServerBundlesFunction = (args: {
    branch: BranchRoute[];
}) => string | Promise<string>;
type BaseBuildManifest = {
    routes: RouteManifest;
};
type DefaultBuildManifest = BaseBuildManifest & {
    serverBundles?: never;
    routeIdToServerBundleId?: never;
};
export type ServerBundlesBuildManifest = BaseBuildManifest & {
    serverBundles: {
        [serverBundleId: string]: {
            id: string;
            file: string;
        };
    };
    routeIdToServerBundleId: Record<string, string>;
};
export type BuildManifest = DefaultBuildManifest | ServerBundlesBuildManifest;
declare const excludedRemixConfigPresetKeys: readonly ["presets"];
type ExcludedRemixConfigPresetKey = typeof excludedRemixConfigPresetKeys[number];
type RemixConfigPreset = Omit<VitePluginConfig, ExcludedRemixConfigPresetKey>;
export type Preset = {
    name: string;
    remixConfig?: (args: {
        remixUserConfig: VitePluginConfig;
    }) => RemixConfigPreset | Promise<RemixConfigPreset>;
    remixConfigResolved?: (args: {
        remixConfig: ResolvedVitePluginConfig;
    }) => void | Promise<void>;
};
export type VitePluginConfig = SupportedRemixEsbuildUserConfig & {
    /**
     * The react router app basename.  Defaults to `"/"`.
     */
    basename?: string;
    /**
     * The path to the build directory, relative to the project. Defaults to
     * `"build"`.
     */
    buildDirectory?: string;
    /**
     * A function that is called after the full Remix build is complete.
     */
    buildEnd?: BuildEndHook;
    /**
     * Whether to write a `"manifest.json"` file to the build directory.`
     * Defaults to `false`.
     */
    manifest?: boolean;
    /**
     * An array of Remix config presets to ease integration with other platforms
     * and tools.
     */
    presets?: Array<Preset>;
    /**
     * The file name of the server build output. This file
     * should end in a `.js` extension and should be deployed to your server.
     * Defaults to `"index.js"`.
     */
    serverBuildFile?: string;
    /**
     * A function for assigning routes to different server bundles. This
     * function should return a server bundle ID which will be used as the
     * bundle's directory name within the server build directory.
     */
    serverBundles?: ServerBundlesFunction;
    /**
     * Enable server-side rendering for your application. Disable to use Remix in
     * "SPA Mode", which will request the `/` path at build-time and save it as
     * an `index.html` file with your assets so your application can be deployed
     * as a SPA without server-rendering. Default's to `true`.
     */
    ssr?: boolean;
};
type BuildEndHook = (args: {
    buildManifest: BuildManifest | undefined;
    remixConfig: ResolvedVitePluginConfig;
    viteConfig: Vite.ResolvedConfig;
}) => void | Promise<void>;
export type ResolvedVitePluginConfig = Readonly<Pick<ResolvedRemixEsbuildConfig, "appDirectory" | "future" | "publicPath" | "routes" | "serverModuleFormat"> & {
    basename: string;
    buildDirectory: string;
    buildEnd?: BuildEndHook;
    manifest: boolean;
    publicPath: string;
    serverBuildFile: string;
    serverBundles?: ServerBundlesFunction;
    ssr: boolean;
}>;
export type ServerBundleBuildConfig = {
    routes: RouteManifest;
    serverBundleId: string;
};
type RemixPluginSsrBuildContext = {
    isSsrBuild: false;
    getRemixServerManifest?: never;
    serverBundleBuildConfig?: never;
} | {
    isSsrBuild: true;
    getRemixServerManifest: () => Promise<RemixManifest>;
    serverBundleBuildConfig: ServerBundleBuildConfig | null;
};
export type RemixPluginContext = RemixPluginSsrBuildContext & {
    rootDirectory: string;
    entryClientFilePath: string;
    entryServerFilePath: string;
    remixConfig: ResolvedVitePluginConfig;
    viteManifestEnabled: boolean;
};
export declare let getServerBuildDirectory: (ctx: RemixPluginContext) => string;
type MaybePromise<T> = T | Promise<T>;
export declare let setRemixDevLoadContext: (loadContext: (request: Request) => MaybePromise<Record<string, unknown>>) => void;
export type RemixVitePlugin = (config?: VitePluginConfig) => Vite.Plugin[];
export declare const remixVitePlugin: RemixVitePlugin;
export {};
