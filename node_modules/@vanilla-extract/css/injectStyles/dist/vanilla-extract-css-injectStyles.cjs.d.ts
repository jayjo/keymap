type FileScope = {
    packageName?: string;
    filePath: string;
};

interface InjectStylesOptions {
    fileScope: FileScope;
    css: string;
}
declare const injectStyles: ({ fileScope, css }: InjectStylesOptions) => void;

export { injectStyles };
