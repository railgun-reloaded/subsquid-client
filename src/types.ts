import type { ExtractFields, EntityQueryMap } from './generated/types'

type QueryInput = {
  [K in keyof EntityQueryMap]?: EntityQueryMap[K]['input'];
}

// These types are for internal use and shouldn't be exported in index.ts
type QueryOutput<T extends QueryInput> = {
  [K in keyof T & keyof EntityQueryMap]: T[K] extends { fields: (keyof EntityQueryMap[K]['entity'])[] }
    ? EntityQueryMap[K]['wrapper'] extends 'array'
      ? ExtractFields<EntityQueryMap[K]['entity'], T[K]['fields']>[]
      : ExtractFields<EntityQueryMap[K]['entity'], T[K]['fields']>
    : EntityQueryMap[K]['output'];
}

type FilterValue<K extends keyof EntityQueryMap, F extends keyof EntityQueryMap[K]['input']> =
  F extends 'fields' ? (keyof EntityQueryMap[K]['entity'])[] :
    F extends 'where' ? EntityQueryMap[K]['input'] extends { where?: infer W } ? W : Record<string, any> :
      F extends 'orderBy' ? EntityQueryMap[K]['input'] extends { orderBy?: infer O } ? O : string[] :
        F extends 'limit' | 'offset' | 'first' ? number :
          F extends 'after' ? string :
            unknown

type FieldsArgs<K extends keyof EntityQueryMap> = keyof EntityQueryMap[K]['entity']

export {
  type QueryInput,
  type QueryOutput,
  type FilterValue,
  type FieldsArgs,
  type EntityQueryMap
}
