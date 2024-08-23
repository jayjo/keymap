type Primitive = string | number | boolean | null | undefined;
type Serializable = {
    [Key in string | number]: Primitive | Serializable;
} | ReadonlyArray<Primitive | Serializable>;
interface SerializerConfig {
    importPath: string;
    importName: string;
    args: ReadonlyArray<Serializable>;
}
declare function addFunctionSerializer<Target extends object>(target: Target, recipe: SerializerConfig): Target;

/**
 * @deprecated Use 'addFunctionSerializer' from '@vanilla-extract/css/functionSerializer'
 */
declare const addRecipe: typeof addFunctionSerializer;

export { addRecipe };
