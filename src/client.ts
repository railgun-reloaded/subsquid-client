import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-tag';
import { NetworkName, NETWORK_CONFIG, SUPPORTED_NETWORKS } from './networks';
import type { QueryIO, ExtractFields } from './generated/types';

// Should it be preload ?? 
type QueryInput = {
  [K in keyof QueryIO]?: QueryIO[K]['input'];
};

// Should it be preload ?? 
type QueryOutput<T extends QueryInput> = {
  [K in keyof T & keyof QueryIO]: T[K] extends { fields: (keyof QueryIO[K]['entity'])[] }
    ? QueryIO[K]['wrapper'] extends 'array'
      ? ExtractFields<QueryIO[K]['entity'], T[K]['fields']>[]
      : ExtractFields<QueryIO[K]['entity'], T[K]['fields']>
    : QueryIO[K]['output'];
};

// Type-safe filter value type mapping
type FilterValue<K extends keyof QueryIO, F extends keyof QueryIO[K]['input']> =
  F extends 'fields' ? (keyof QueryIO[K]['entity'])[] :
  F extends 'where' ? Record<string, any> :  // We could make this more specific if needed
  F extends 'orderBy' ? string[] :
  F extends 'limit' | 'offset' | 'first' ? number :
  F extends 'after' ? string :
  unknown; // Default for any other filter properties


// Keeping this commented as reference, but we're not using it currently
/*
type FilterName =
| 'fields'    // Required fields to select
| 'where'     // Filter conditions
| 'orderBy'   // Sorting options
| 'limit'     // Number of items to return
| 'offset'    // Number of items to skip
| 'after'     // Cursor for pagination
| 'first';    // Number of items to return (for connections)
*/


export class SubsquidClient {
  private client: GraphQLClient;

  constructor(network: NetworkName) {
    const url = this.getSubsquidUrlForNetwork(network);
    this.client = new GraphQLClient(url);
  }

  private getSubsquidUrlForNetwork = (network: NetworkName): string => {
    const configUrl = NETWORK_CONFIG[network];
    if (!configUrl) {
      throw new Error(
        `Unsupported network: ${network}. Supported networks are: ${SUPPORTED_NETWORKS.join(', ')}`,
      );
    }
    return configUrl;
  };

  /**
   * Generic request method for GraphQL queries with type safety
   */
  private request = async <T>(document: string | any, variables?: any): Promise<T> => {
    return this.client.request<T>(document, variables);
  };

  /**
   * Converts a JSON object to a GraphQL arguments string
   * Handles enum values correctly (removes quotes from values that appear to be enums)
   */
  private jsonToGraphQLArgs(obj: any): string {
    if (!obj) return '';

    // Replace with a completely new implementation
    const processObj = (obj: any): string => {
      if (obj === null || obj === undefined) {
        return 'null';
      }

      if (typeof obj === 'string') {
        // Check if this is likely an enum (all uppercase with underscores and numbers)
        if (/^[A-Z0-9_]+$/.test(obj)) {
          return obj; // Return enum without quotes
        } else {
          return JSON.stringify(obj); // Return string with quotes
        }
      }

      if (typeof obj === 'number' || typeof obj === 'boolean') {
          return String(obj);
      }

      if (Array.isArray(obj)) {
        const items = obj.map((item) => processObj(item)).join(', ');
        return `[${items}]`;
      }

      if (typeof obj === 'object') {
        const pairs = Object.entries(obj)
          .map(([key, value]) => `${key}: ${processObj(value)}`)
          .join(', ');
        return `{${pairs}}`;
      }
  
      return String(obj);
    };

    return processObj(obj);
  }


  
  private processFilter<K extends keyof QueryIO, F extends keyof QueryIO[K]['input']>(
      entityName: K,
      filterName: F,
      value: FilterValue<K, F>
    ): string {
    console.log('process filter entity: ', entityName);
    console.log('process filter: ', filterName);
    console.log('value: ', value);
    
    // Skip fields as they're handled separately
    if (filterName === 'fields') {
      return '';
    }

    // Handle different filter types
    switch (filterName) {
      case 'where':
        return value ? `where: ${this.jsonToGraphQLArgs(value)}` : '';
        
      case 'orderBy':
        if (Array.isArray(value) && value.length > 0) {
          const orderByValues = value
            .map(order => String(order).replace(/["']/g, ''))
            .join(', ');
          return `orderBy: [${orderByValues}]`;
        }
        return '';
        
      case 'limit':
      case 'offset':
      case 'first':
        return value !== undefined ? `${String(filterName)}: ${value}` : '';
        
      case 'after':
        return value ? `after: ${JSON.stringify(value)}` : '';
        
      default:
        // For any other parameter, determine format automatically
        if (value !== undefined && value !== null) {
          if (typeof value === 'string') {
            // Check if it's an enum value (all caps with underscores)
            const isEnum = /^[A-Z][A-Z0-9_]*$/.test(value as string);
            return `${String(filterName)}: ${isEnum ? value : JSON.stringify(value)}`;
          } else if (typeof value === 'number' || typeof value === 'boolean') {
            return `${String(filterName)}: ${value}`;
          } else if (Array.isArray(value)) {
            return `${String(filterName)}: ${this.jsonToGraphQLArgs(value)}`;
          } else if (typeof value === 'object') {
            return `${String(filterName)}: ${this.jsonToGraphQLArgs(value)}`;
          }
        }
        return '';
    }
  }
  /**
   * Generic query method that can handle any entity type with proper type safety
   */
  async query<T extends QueryInput>(
    input: T & Record<Exclude<keyof T, keyof QueryInput>, never>,
  ): Promise<QueryOutput<T>> {
    try {
      console.log('input: ', input);
      const entities = Object.entries(input);
      
      const queryStr = `
        query {
          ${entities
            .map(([entityName, filters]) => {
              // Get strongly typed entity name
              const typedEntityName = entityName as keyof QueryIO;
              const typedFilters = filters as QueryIO[typeof typedEntityName]['input'];
              
              // Extract fields which are required for selection
              const fields = typedFilters.fields as (keyof QueryIO[typeof typedEntityName]['entity'])[];
              
              console.log('Fields: ', fields);

              if (!fields || !Array.isArray(fields)) {
                throw new Error(`Fields must be provided for entity ${String(typedEntityName)}`);
              }
              
              // can this be done with a map reduce ? 
              const args = Object.entries(typedFilters)
                .filter(([name]) => name !== 'fields')
                .map(([name, value]) => {
                  const argsName = name as keyof QueryIO[typeof typedEntityName]['input'];
                  const argsValues = value as FilterValue<typeof typedEntityName, keyof QueryIO[typeof typedEntityName]['input']>
                  return this.processFilter(
                    typedEntityName, 
                    argsName,
                    argsValues
                  );
                })
                .filter(Boolean)
                .join(', ');
  
              // Handle edge case: don't include empty parentheses when args is empty
              const queryForEntity = `${String(entityName)}${args ? `(${args})` : ''} {
                ${fields.join('\n                ')}
              }`;

              console.log('queryForEntity: ', queryForEntity);
              

              return queryForEntity;
            }).join('\n          ')}
        }
      `;

      console.log('final query: ', queryStr);

      const query = gql`${queryStr}`;
      const response = await this.request<QueryOutput<T>>(query);
      return response;
    } catch (error) {
      console.error('Error in query', error);
      throw error;
    }
  }
}
