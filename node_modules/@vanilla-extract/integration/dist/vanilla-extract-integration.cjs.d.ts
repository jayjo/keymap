import { Adapter, FileScope } from '@vanilla-extract/css';
import { Plugin, BuildOptions } from 'esbuild';
import { InlineConfig } from 'vite';

type IdentifierOption = ReturnType<Adapter['getIdentOption']>;

declare function stringifyFileScope({ packageName, filePath, }: FileScope): string;
declare function parseFileScope(serialisedFileScope: string): FileScope;
interface ProcessVanillaFileOptions {
    source: string;
    filePath: string;
    outputCss?: boolean;
    identOption?: IdentifierOption;
    serializeVirtualCssPath?: (file: {
        fileName: string;
        fileScope: FileScope;
        source: string;
    }) => string | Promise<string>;
}
declare function processVanillaFile({ source, filePath, outputCss, identOption, serializeVirtualCssPath, }: ProcessVanillaFileOptions): Promise<string>;

declare function getSourceFromVirtualCssFile(id: string): Promise<{
    fileName: string;
    source: string;
}>;

interface PackageInfo {
    name: string;
    path: string;
    dirname: string;
}
declare function getPackageInfo(cwd?: string | null): PackageInfo;

interface VanillaExtractTransformPluginParams {
    identOption?: IdentifierOption;
}
declare const vanillaExtractTransformPlugin: ({ identOption, }: VanillaExtractTransformPluginParams) => Plugin;
interface CompileOptions {
    filePath: string;
    identOption: IdentifierOption;
    cwd?: string;
    esbuildOptions?: Pick<BuildOptions, 'plugins' | 'external' | 'define' | 'loader' | 'tsconfig' | 'conditions'>;
}
declare function compile({ filePath, identOption, cwd, esbuildOptions, }: CompileOptions): Promise<{
    source: string;
    watchFiles: string[];
}>;

interface Compiler {
    processVanillaFile(filePath: string, options?: {
        outputCss?: boolean;
    }): Promise<{
        source: string;
        watchFiles: Set<string>;
    }>;
    getCssForFile(virtualCssFilePath: string): {
        filePath: string;
        css: string;
    };
    close(): Promise<void>;
}
interface CreateCompilerOptions {
    root: string;
    cssImportSpecifier?: (filePath: string) => string;
    identifiers?: IdentifierOption;
    viteResolve?: InlineConfig['resolve'];
    vitePlugins?: InlineConfig['plugins'];
}
declare const createCompiler: ({ root, identifiers, cssImportSpecifier, viteResolve, vitePlugins, }: CreateCompilerOptions) => Compiler;

declare const hash: (value: string) => string;

declare const normalizePath: (filename: string) => string;
interface AddFileScopeParams {
    source: string;
    filePath: string;
    rootPath: string;
    packageName: string;
    globalAdapterIdentifier?: string;
}
declare function addFileScope({ source, filePath, rootPath, packageName, globalAdapterIdentifier, }: AddFileScopeParams): string;

declare function serializeCss(source: string): Promise<string>;
declare function deserializeCss(source: string): Promise<string>;

interface TransformParams {
    source: string;
    filePath: string;
    rootPath: string;
    packageName: string;
    identOption: IdentifierOption;
    globalAdapterIdentifier?: string;
}
declare const transformSync: ({ source, filePath, rootPath, packageName, identOption, }: TransformParams) => string;
declare const transform: ({ source, filePath, rootPath, packageName, identOption, globalAdapterIdentifier, }: TransformParams) => Promise<string>;

declare const cssFileFilter: RegExp;
declare const virtualCssFileFilter: RegExp;

export { CompileOptions, Compiler, CreateCompilerOptions, IdentifierOption, PackageInfo, addFileScope, compile, createCompiler, cssFileFilter, deserializeCss, getPackageInfo, getSourceFromVirtualCssFile, hash, normalizePath, parseFileScope, processVanillaFile, serializeCss, stringifyFileScope, transform, transformSync, vanillaExtractTransformPlugin, virtualCssFileFilter };
