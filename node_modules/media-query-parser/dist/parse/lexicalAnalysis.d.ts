export declare type Token = WhitespaceToken | StringToken | HashToken | DelimToken | CommaToken | LeftParenToken | RightParenToken | DimensionToken | NumberToken | PercentageToken | IdentToken | FunctionToken | UrlToken | CDCToken | ColonToken | SemicolonToken | CDOToken | AtKeywordToken | LeftBracketToken | RightBracketToken | LeftCurlyToken | RightCurlyToken | EOFToken;
export declare type WhitespaceToken = {
    type: '<whitespace-token>';
};
export declare type StringToken = {
    type: '<string-token>';
    value: string;
};
export declare type HashToken = {
    type: '<hash-token>';
    value: string;
    flag: 'id' | 'unrestricted';
};
export declare type DelimToken = {
    type: '<delim-token>';
    value: number;
};
export declare type CommaToken = {
    type: '<comma-token>';
};
export declare type LeftParenToken = {
    type: '<(-token>';
};
export declare type RightParenToken = {
    type: '<)-token>';
};
export declare type DimensionToken = {
    type: '<dimension-token>';
    value: number;
    unit: string;
    flag: 'number';
};
export declare type NumberToken = {
    type: '<number-token>';
    value: number;
    flag: 'number' | 'integer';
};
export declare type PercentageToken = {
    type: '<percentage-token>';
    value: number;
    flag: 'number';
};
export declare type CDCToken = {
    type: '<CDC-token>';
};
export declare type ColonToken = {
    type: '<colon-token>';
};
export declare type SemicolonToken = {
    type: '<semicolon-token>';
};
export declare type CDOToken = {
    type: '<CDO-token>';
};
export declare type AtKeywordToken = {
    type: '<at-keyword-token>';
    value: string;
};
export declare type LeftBracketToken = {
    type: '<[-token>';
};
export declare type RightBracketToken = {
    type: '<]-token>';
};
export declare type LeftCurlyToken = {
    type: '<{-token>';
};
export declare type RightCurlyToken = {
    type: '<}-token>';
};
export declare type EOFToken = {
    type: '<EOF-token>';
};
export declare type IdentToken = {
    type: '<ident-token>';
    value: string;
};
export declare type FunctionToken = {
    type: '<function-token>';
    value: string;
};
export declare type UrlToken = {
    type: '<url-token>';
    value: string;
};
export declare const lexicalAnalysis: (str: string, index?: number) => Token[] | null;
export declare const consumeString: (str: string, index: number) => [number, string] | null;
export declare const wouldStartIdentifier: (str: string, index: number) => boolean;
export declare const consumeEscape: (str: string, index: number) => [number, number] | null;
export declare const consumeNumeric: (str: string, index: number) => [
    number,
    (['<number-token>', number, 'number' | 'integer'] | ['<percentage-token>', number] | ['<dimension-token>', number, string])
] | null;
export declare const consumeNumber: (str: string, index: number) => [number, number, 'integer' | 'number'] | null;
export declare const consumeIdentUnsafe: (str: string, index: number) => [number, string] | null;
export declare const consumeIdent: (str: string, index: number) => [number, string] | null;
export declare const consumeUrl: (str: string, index: number) => [number, string] | null;
export declare const consumeIdentLike: (str: string, index: number) => [number, string, '<ident-token>' | '<function-token>' | '<url-token>'] | null;
