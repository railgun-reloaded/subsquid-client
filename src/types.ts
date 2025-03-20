import type { QueryIO, ExtractFields } from './generated/types';

export { QueryIO };

/**
 * A type representing the input structure for queries,
 * mapping each entity to its input parameters.
 */
export type QueryInput = {
  [K in keyof QueryIO]?: QueryIO[K]['input'];
};

/**
 * A utility type that enforces a strict shape for an object type T,
 * ensuring it only contains keys from U and no additional properties.
 */
export type Strictly<T, U> = T & Record<Exclude<keyof T, keyof U>, never>;

/**
 * Maps query inputs to their corresponding output types based on selected fields.
 * Handles both single entity and array responses based on the wrapper type.
 */
export type QueryOutput<T extends QueryInput> = {
  [K in keyof T & keyof QueryIO]: T[K] extends { fields: (keyof QueryIO[K]['entity'])[] }
    ? QueryIO[K]['wrapper'] extends 'array'
      ? ExtractFields<QueryIO[K]['entity'], T[K]['fields']>[]
      : ExtractFields<QueryIO[K]['entity'], T[K]['fields']>
    : QueryIO[K]['output'];
};

/**
 * Extracts the expected type for a specific filter field in a query.
 * Maps each filter type (fields, where, orderBy, etc.) to its appropriate TypeScript type.
 */
export type FilterValue<K extends keyof QueryIO, F extends keyof QueryIO[K]['input']> =
  F extends 'fields' ? (keyof QueryIO[K]['entity'])[] :
  F extends 'where' ? QueryIO[K]['input'] extends { where?: infer W } ? W : Record<string, any> :
  F extends 'orderBy' ? QueryIO[K]['input'] extends { orderBy?: infer O } ? O : string[] :
  F extends 'limit' | 'offset' | 'first' ? number :
  F extends 'after' ? string :
  unknown; 

/**
 * Represents the available field names that can be selected for a specific entity type.
 */
export type FieldsArgs<K extends keyof QueryIO> = keyof QueryIO[K]['entity'];
  