import { PluginObj, PluginPass } from '@babel/core';

declare const styleFunctions: readonly [...("style" | "createTheme" | "styleVariants" | "fontFace" | "keyframes" | "createVar" | "recipe" | "createContainer" | "layer")[], "globalStyle", "createGlobalTheme", "createThemeContract", "globalFontFace", "globalKeyframes", "globalLayer", "recipe"];
type StyleFunction = (typeof styleFunctions)[number];
type Context = PluginPass & {
    namespaceImport: string;
    importIdentifiers: Map<string, StyleFunction>;
};
declare function export_default(): PluginObj<Context>;

export { export_default as default };
