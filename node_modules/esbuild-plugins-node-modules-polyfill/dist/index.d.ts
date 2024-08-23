import { PartialMessage, Plugin } from 'esbuild';

declare const escapeRegex: (str: string) => string;
declare const commonJsTemplate: ({ importPath }: {
    importPath: string;
}) => string;
declare const normalizeNodeBuiltinPath: (path: string) => string;

interface NodePolyfillsOptions {
    fallback?: 'empty' | 'error' | 'none';
    formatError?: (this: void, args: {
        importer: string;
        moduleName: string;
        polyfillExists: boolean;
    }) => PartialMessage | Promise<PartialMessage>;
    globals?: {
        Buffer?: boolean;
        process?: boolean;
    };
    modules?: Record<string, boolean | 'empty' | 'error'> | string[];
    name?: string;
    namespace?: string;
}
declare const nodeModulesPolyfillPlugin: (options?: NodePolyfillsOptions) => Plugin;

export { type NodePolyfillsOptions, commonJsTemplate, escapeRegex, nodeModulesPolyfillPlugin, normalizeNodeBuiltinPath };
