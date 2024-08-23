import { DimensionToken, IdentToken, NumberToken, Token } from './lexicalAnalysis';
declare type WToken = Token & {
    wsBefore: boolean;
    wsAfter: boolean;
};
export declare type AST = MediaQuery[];
export declare const toAST: (str: string) => AST;
export declare const toUnflattenedAST: (str: string) => AST;
export declare const removeWhitespace: (tokenList: Token[]) => WToken[];
export declare const syntacticAnalysis: (tokenList: Token[]) => MediaQuery[];
export declare type MediaQuery = {
    mediaPrefix: 'not' | 'only' | null;
    mediaType: 'all' | 'screen' | 'print';
    mediaCondition: MediaCondition | null;
};
export declare const tokenizeMediaQuery: (tokens: WToken[]) => MediaQuery;
export declare type MediaCondition = {
    operator: 'and' | 'or' | 'not' | null;
    children: Array<MediaCondition | MediaFeature>;
};
export declare const tokenizeMediaCondition: (tokens: WToken[], mayContainOr: boolean, previousOperator?: 'and' | 'or' | 'not' | null) => MediaCondition;
export declare type MediaFeature = MediaFeatureBoolean | MediaFeatureValue | MediaFeatureRange;
export declare type MediaFeatureBoolean = {
    context: 'boolean';
    feature: string;
};
export declare type MediaFeatureValue = {
    context: 'value';
    prefix: 'min' | 'max' | null;
    feature: string;
    value: ValidValueToken;
};
export declare type MediaFeatureRange = {
    context: 'range';
    feature: string;
    range: ValidRange;
};
export declare type ValidValueToken = NumberToken | DimensionToken | RatioToken | IdentToken;
export declare const tokenizeMediaFeature: (rawTokens: WToken[]) => MediaFeature;
export declare type RatioToken = {
    type: '<ratio-token>';
    numerator: number;
    denominator: number;
};
export declare type ValidRangeToken = NumberToken | DimensionToken | RatioToken | {
    type: '<ident-token>';
    value: 'infinite';
};
declare type ConvenientToken = WToken | (RatioToken & {
    wsBefore: boolean;
    wsAfter: boolean;
});
export declare type ValidRange = {
    leftToken: ValidRangeToken;
    leftOp: '<' | '<=';
    featureName: string;
    rightOp: '<' | '<=';
    rightToken: ValidRangeToken;
} | {
    leftToken: ValidRangeToken;
    leftOp: '>' | '>=';
    featureName: string;
    rightOp: '>' | '>=';
    rightToken: ValidRangeToken;
} | {
    leftToken: ValidRangeToken;
    leftOp: '>' | '>=' | '<' | '<=' | '=';
    featureName: string;
    rightOp: null;
    rightToken: null;
} | {
    leftToken: null;
    leftOp: null;
    featureName: string;
    rightOp: '>' | '>=' | '<' | '<=' | '=';
    rightToken: ValidRangeToken;
};
export declare const tokenizeRange: (tokens: ConvenientToken[]) => ValidRange;
export {};
