type FileScope = {
    packageName?: string;
    filePath: string;
};

declare function setFileScope(filePath: string, packageName?: string): void;
declare function endFileScope(): void;
declare function hasFileScope(): boolean;
declare function getFileScope(): FileScope;
declare function getAndIncrementRefCounter(): number;

export { endFileScope, getAndIncrementRefCounter, getFileScope, hasFileScope, setFileScope };
