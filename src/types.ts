import type { EntityQueryMap, FieldSelector, Maybe } from './generated/types'

type QueryInput = {
  [K in keyof EntityQueryMap]?: Omit<EntityQueryMap[K]['input'], 'fields'> & {
    // allow fields to be the general FieldSelector array type OR the readonly tuple
    fields: EntityQueryMap[K]['input']['fields'] | readonly FieldSelector<EntityQueryMap[K]['entity']>[]
  };
}

type StrictQueryInput<T extends QueryInput> = T & Record<Exclude<keyof T, keyof EntityQueryMap>, never>

type FilterValue<K extends keyof EntityQueryMap, F extends keyof EntityQueryMap[K]['input']> =
  // This FilterValue type is primarily for the non-fields arguments like where, orderBy, limit
  F extends 'where'
    ? EntityQueryMap[K]['input'] extends { where?: infer W } ? W : Record<string, any>
    : F extends 'orderBy'
      ? EntityQueryMap[K]['input'] extends { orderBy?: infer O } ? O : string[]
      : F extends 'limit' | 'offset' | 'first' ? number
        : F extends 'after' ? string
          : unknown

type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

  type BuildTupleSelection<Entity, Fields extends readonly FieldSelector<any>[]> =
    // If the tuple is empty, the selection is empty, return an empty object
    Fields extends readonly []
      ? {}
      : // If the tuple has a head and a tail
      Fields extends readonly [infer Head extends FieldSelector<any>, ...infer Tail extends readonly FieldSelector<any>[]]
        ? // Process the head of the tuple, intersect the result with the recursive call on the tail
          UnionToIntersection<ProcessFieldSelectorItem<Head, Entity>> & BuildTupleSelection<Entity, Tail>
        : // Fallback for unexpected tuple shape (shouldn't happen with 'as const' and FieldSelector)
        any

  // Helper type: Processes a single item from the fields tuple against the Entity type
  // This determines the type of a single selected field, including nested fields
  type ProcessFieldSelectorItem<SelectorItem extends FieldSelector<any>, Entity> =
    // Case 1: SelectorItem is a string (primitive field selection)
    SelectorItem extends string
      ? // Check if the string is a valid key of the Entity
      SelectorItem extends keyof Entity
        ? Pick<Entity, SelectorItem> // Return an object with just that field and its type
        : // If the string is not a valid key, this selection is invalid
      // Using `never` here makes the intersection fail, resulting in `never` for the output key.
      // We could also make the field optional or map to `unknown` depending on desired strictness.
      // `never` is good for strong compile-time errors.
        never
      : // Case 2: SelectorItem is an object (nested field selection)
      SelectorItem extends object
        ? // Get the key name from the object (FieldSelector objects should have exactly one key)
        keyof SelectorItem extends infer FieldName extends string
          ? // Check if the field name is a valid key of the Entity
          FieldName extends keyof Entity
            ? // Get the sub-selectors tuple from the object value
            SelectorItem[FieldName] extends infer Subfields extends readonly FieldSelector<any>[]
              ? // Get the type of the nested field on the Entity
              Entity[FieldName] extends (infer ItemType)[] // Check if the Entity field is a list
                ? // If it's a list, recursively build the selection for the ItemType and wrap in an array
                  { [K in FieldName]: BuildTupleSelection<ItemType, Subfields>[] }
                : // If it's not a list (assume it's a single object), recursively build the selection for the Entity field type
                  // Need to handle Maybe<Object> case - BuildTupleSelection should work correctly with Maybe<Item>
                  { [K in FieldName]: BuildTupleSelection<Entity[FieldName], Subfields> }
              : // If the subfields aren't a readonly tuple of FieldSelectors (unexpected)
              never
            : // If the field name is not a valid key on the Entity
            never
          : // If the SelectorItem object doesn't have a single string key (unexpected structure)
          never
        : // Case 3: SelectorItem is neither string nor object (unexpected structure)
        never

// Main type: Maps the QueryInput structure to the QueryOutput data structure
type QueryOutput<T extends QueryInput> = {
  // Iterate over the keys present in the input T that are also valid query keys
  [K in keyof T & keyof EntityQueryMap]:
  // Get the corresponding EntityQueryMap entry for the query K
  EntityQueryMap[K] extends { entity: infer Entity; wrapper: infer Wrapper }
    ? // Get the 'fields' property type from the input T for key K
    T[K] extends { fields: infer Fields }
      ? // Ensure 'fields' is a readonly tuple of FieldSelector items (enforces 'as const')
      Fields extends readonly FieldSelector<any>[]
        ? // Build the core selected object type based on the Entity and the Fields tuple
        BuildTupleSelection<Entity, Fields> extends infer SelectedType
          ? // Apply the wrapper ('array', 'maybe', 'simple') based on the schema return type
          Wrapper extends 'array'
            ? SelectedType[] // If schema returns list, output is array of selected type
            : Wrapper extends 'maybe'
              ? Maybe<SelectedType> // If schema returns nullable, output is Maybe<selected type>
              : SelectedType // If schema returns non-nullable single, output is selected type
          : // Should not happen
          never
        : // If 'fields' was provided but is NOT a readonly tuple (i.e., 'as const' was forgotten)
      // We can provide a less specific type here, like `any`, or `EntityQueryMap[K]['output']` (which is the full schema type),
      // or make it `never` to force 'as const'. Let's use EntityQueryMap[K]['output'] as a fallback.
        EntityQueryMap[K]['output'] // Fallback to the original generated output type
      : // If 'fields' property is missing for a query in the input (should ideally not happen based on QueryInput type)
      never // Or handle as an error case
    : // If K is in T but not a valid key in EntityQueryMap (should be caught by StrictQueryInput/keyof T & keyof EntityQueryMap)
    never;
}

type RequestOptions = {
  query: string;
  operationName?: string;
  variables?: Record<string, any>;
  extensions?: Record<string, any>;
}

export {
  type QueryInput,
  type QueryOutput,
  type FilterValue,
  type EntityQueryMap,
  type StrictQueryInput,
  type RequestOptions
}
