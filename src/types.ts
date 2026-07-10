import type { EntityQueryMap, FieldSelector, FragmentKeyToType, Maybe, QueryFieldsInputMap, TypeNameToType } from './generated/types.js'

// `__typename` is selectable on any object/interface in GraphQL; allow it alongside
// the codegen-produced selector union for every entity.
type AllowedFieldItem<K extends keyof EntityQueryMap> =
  (K extends keyof QueryFieldsInputMap
    ? QueryFieldsInputMap[K] extends readonly (infer Item)[]
      ? Item
      : never
    : FieldSelector<EntityQueryMap[K]['entity']>) | '__typename'

type QueryInput = {
  [K in keyof EntityQueryMap]?: Omit<EntityQueryMap[K]['input'], 'fields'> & {
    fields: readonly AllowedFieldItem<K>[]
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

  // A selector item is a "fragment item" when its only key is the literal "... on TypeName"
  // form (i.e. matches FragmentKeyToType). We treat those separately from regular field
  // selectors so the resulting output is a discriminated union per implementor rather
  // than a single intersected object.
  type IsFragmentKey<K> = K extends keyof FragmentKeyToType ? true : false

  type FragmentItemEntity<Item> =
    Item extends { readonly [K in keyof Item]: any }
      ? keyof Item extends infer FragKey
        ? FragKey extends keyof FragmentKeyToType
          ? TypeNameToType[FragmentKeyToType[FragKey]]
          : never
        : never
      : never

  type FragmentItemSubfields<Item> =
    Item extends Record<string, infer V>
      ? V extends readonly FieldSelector<any>[]
        ? V
        : never
      : never

  // Splits the fields tuple into base-field items and fragment items
  type SplitBaseFields<Fields extends readonly any[]> =
    Fields extends readonly [infer Head, ...infer Tail extends readonly any[]]
      ? Head extends object
        ? IsFragmentKey<keyof Head> extends true
          ? SplitBaseFields<Tail>
          : readonly [Head, ...SplitBaseFields<Tail>]
        : readonly [Head, ...SplitBaseFields<Tail>]
      : readonly []

  type SplitFragmentItems<Fields extends readonly any[]> =
    Fields extends readonly [infer Head, ...infer Tail extends readonly any[]]
      ? Head extends object
        ? IsFragmentKey<keyof Head> extends true
          ? readonly [Head, ...SplitFragmentItems<Tail>]
          : SplitFragmentItems<Tail>
        : SplitFragmentItems<Tail>
      : readonly []

  // Builds a per-implementor selection: { __typename: 'X' } & <selected fields of X>.
  // Distributes over the union of fragment items so the result is a union, not an intersection.
  type BuildFragmentUnion<FragmentItems extends readonly any[]> =
    FragmentItems extends readonly []
      ? unknown
      : FragmentItems[number] extends infer Item
        ? Item extends object
          ? FragmentItemEntity<Item> extends infer Entity
            ? Entity extends object
              ? { __typename: Entity extends { __typename?: infer N } ? NonNullable<N> : string } &
                BuildTupleSelection<Entity, FragmentItemSubfields<Item>>
              : never
            : never
          : never
        : never

  type BuildTupleSelection<Entity, Fields extends readonly any[]> =
    BuildBaseSelection<Entity, SplitBaseFields<Fields>> &
    BuildFragmentUnion<SplitFragmentItems<Fields>>

  // Original recursive base-field intersection (no fragment handling — those are split out)
  type BuildBaseSelection<Entity, Fields extends readonly any[]> =
    Fields extends readonly []
      ? {}
      : Fields extends readonly [infer Head, ...infer Tail extends readonly any[]]
        ? UnionToIntersection<ProcessFieldSelectorItem<Head, Entity>> & BuildBaseSelection<Entity, Tail>
        : any

  // Helper type: Processes a single item from the fields tuple against the Entity type
  // This determines the type of a single selected field, including nested fields
  type ProcessFieldSelectorItem<SelectorItem, Entity> =
    // Case 1: SelectorItem is a string (primitive field selection)
    SelectorItem extends string
      ? SelectorItem extends keyof Entity
        ? Pick<Entity, SelectorItem>
        : SelectorItem extends '__typename'
          ? { __typename: Entity extends { __typename?: infer N } ? NonNullable<N> : string }
          : never
      : // Case 2: SelectorItem is an object (nested field selection)
      SelectorItem extends object
        ? keyof SelectorItem extends infer FieldName extends string
          ? FieldName extends keyof Entity
            ? SelectorItem[FieldName & keyof SelectorItem] extends infer Subfields extends readonly any[]
              ? Entity[FieldName] extends (infer ItemType)[]
                ? { [K in FieldName]: BuildTupleSelection<ItemType, Subfields>[] }
                : { [K in FieldName]: BuildTupleSelection<NonNullable<Entity[FieldName]>, Subfields> }
              : never
            : never
          : never
        : never

// Main type: Maps the QueryInput structure to the QueryOutput data structure
type QueryOutput<T extends QueryInput> = {
  [K in keyof T & keyof EntityQueryMap]:
  EntityQueryMap[K] extends { entity: infer Entity; wrapper: infer Wrapper }
    ? T[K] extends { fields: infer Fields }
      ? Fields extends readonly any[]
        ? BuildTupleSelection<Entity, Fields> extends infer SelectedType
          ? Wrapper extends 'array'
            ? SelectedType[]
            : Wrapper extends 'maybe'
              ? Maybe<SelectedType>
              : SelectedType
          : never
        : EntityQueryMap[K]['output']
      : never
    : never;
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
