import type { QueryIO, ExtractFields } from './generated/types';

export type QueryInput = {
  [K in keyof QueryIO]?: QueryIO[K]['input'];
};

// These types are for internal use and shouldn't be exported in index.ts
export type QueryOutput<T extends QueryInput> = {
  [K in keyof T & keyof QueryIO]: T[K] extends { fields: (keyof QueryIO[K]['entity'])[] }
    ? QueryIO[K]['wrapper'] extends 'array'
      ? ExtractFields<QueryIO[K]['entity'], T[K]['fields']>[]
      : ExtractFields<QueryIO[K]['entity'], T[K]['fields']>
    : QueryIO[K]['output'];
};

export type FilterValue<K extends keyof QueryIO, F extends keyof QueryIO[K]['input']> =
  F extends 'fields' ? (keyof QueryIO[K]['entity'])[] :
  F extends 'where' ? QueryIO[K]['input'] extends { where?: infer W } ? W : Record<string, any> :
  F extends 'orderBy' ? QueryIO[K]['input'] extends { orderBy?: infer O } ? O : string[] :
  F extends 'limit' | 'offset' | 'first' ? number :
  F extends 'after' ? string :
  unknown; 

export type FieldsArgs<K extends keyof QueryIO> = keyof QueryIO[K]['entity'];