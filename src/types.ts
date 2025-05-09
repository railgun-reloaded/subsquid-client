import type { EntityQueryMap } from './generated/types'

type QueryInput = {
  [K in keyof EntityQueryMap]?: EntityQueryMap[K]['input'];
}

type ExtractFields<T, F extends (keyof T)[] | undefined> = F extends (keyof T)[]
  ? Pick<T, F[number]>
  : T

type StrictQueryInput<T extends QueryInput> = T & Record<Exclude<keyof T, keyof EntityQueryMap>, never>

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
  type FieldsArgs,
  type EntityQueryMap,
  type StrictQueryInput,
  type RequestOptions,
}
