import type { Query } from './generated/types';
export declare const isNetworkValid: (url: string) => boolean;
export declare class SubsquidClient {
    private client;
    constructor(url: string);
    /**
     * Generic request method for GraphQL queries with type safety
     */
    request: <T>(document: string | any, variables?: any) => Promise<T>;
    /**
     * Converts a JSON object to a GraphQL arguments string
     * Handles enum values correctly (removes quotes from values that appear to be enums)
     */
    private jsonToGraphQLArgs;
    /**
     * Generic query method that can handle any entity type with proper type safety
     */
    query<K extends keyof Query>(entity: K, fields: string[], where?: any, orderBy?: string[], limit?: number, offset?: number): Promise<Query[K]>;
}
