type CSSVarFunction = `var(--${string})` | `var(--${string}, ${string | number})`;
type Contract = {
    [key: string]: CSSVarFunction | null | Contract;
};
type Primitive$1 = string | boolean | number | null | undefined;
type MapLeafNodes<Obj, LeafType> = {
    [Prop in keyof Obj]: Obj[Prop] extends Primitive$1 ? LeafType : Obj[Prop] extends Record<string | number, any> ? MapLeafNodes<Obj[Prop], LeafType> : never;
};

declare function getVarName(variable: string): string;

declare function get(obj: any, path: Array<string>): any;

type Primitive = string | number | null | undefined;
type Walkable = {
    [Key in string | number]: Primitive | Walkable;
};
declare function walkObject<T extends Walkable, MapTo>(obj: T, fn: (value: Primitive, path: Array<string>) => MapTo, path?: Array<string>): MapLeafNodes<T, MapTo>;

export { type CSSVarFunction, type Contract, type MapLeafNodes, get, getVarName, walkObject };
