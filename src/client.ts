import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-tag';
import { NetworkName, NETWORK_CONFIG, SUPPORTED_NETWORKS } from './networks';
import { QueryIO, QueryInput, QueryOutput, FilterValue, FieldsArgs } from './types';

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
   * Converts a value to a GraphQL argument `where` argument to string
   *
  **/
  private processWhereArgs<V>(value: V): string {
    // Handle null/undefined
    if (value === null || value === undefined) {
      return 'null';
    }
    
    // Handle strings (including enums)
    if (typeof value === 'string') {
      // Check if this is likely an enum (all uppercase with underscores and numbers)
      const probablyEnum = /^[A-Z_](?:[A-Z0-9][A-Z0-9_]*)*$/;
      if (probablyEnum.test(value)) {
        return value; // Return enum without quotes
      } else {
        return JSON.stringify(value); // Return string with quotes
      }
    }
    
    // Handle numbers and booleans
    if (typeof value === 'number' || typeof value === 'boolean') {
      return String(value);
    }
    
    // Handle arrays
    if (Array.isArray(value)) {
      const items = value.map(item => this.processWhereArgs(item)).join(', ');
      return `[${items}]`;
    }
    
    // Handle objects, most likely to be nested queries
    if (value !== null && typeof value === 'object') {
      const pairs = Object.entries(value)
        .map(([key, val]) => `${key}: ${this.processWhereArgs(val)}`)
        .join(', ');
      return `{${pairs}}`;
    }
    
    // Fallback for any other type
    return String(value);
  };


  /**
   * Process a filter for a GraphQL query, handling different filter types appropriately
   * 
   * @param entityName - The entity being queried (e.g., 'tokens', 'commitments')
   * @param filterName - The filter name (e.g., 'where', 'orderBy', 'limit')
   * @param value - The filter value with appropriate type based on FilterValue
   * @returns Formatted GraphQL argument string
   */
  private processFilter<K extends keyof QueryIO, F extends keyof QueryIO[K]['input']>(
      _entityName: K,
      filterName: F,
      value: FilterValue<K, F>
    ): string {

    switch (filterName) {
      case 'where':
        if (value === null || value === undefined) {
          return '';
        }
        return `where: ${this.processWhereArgs(value)}`;
        
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
        
      case 'fields':
        // Fields are handled separately, so we don't process them here
        return '';
        
      default:
        throw new Error(`Unexpected filter name: ${String(filterName)}`);
    }
  }

  /**
   * Parse a single entity query from the input object
   * 
   * @param entityName - The entity name (e.g., 'tokens')
   * @param filters - The filters for the entity (e.g., { fields: ['id', 'tokenType', 'tokenAddress', 'tokenSubID'], limit: 5 })
   * @returns Formatted GraphQL query string
   */
  private parseEntityQuery<K extends keyof QueryIO>(
    {entityName, filters}: { entityName: K, filters: QueryIO[K]['input'] }
  ): string {
    // We know entity name is a key of QueryIO, force a cast type over it
    const typedEntityName = entityName as keyof QueryIO;
    const fields = filters.fields as FieldsArgs<typeof typedEntityName>[];
    
    // Check that query has actually some fields requested data, if not is not a valid gql query
    if (!fields || !Array.isArray(fields) || fields.length === 0) {
      throw new Error(`Query can't have empty return data for entity ${String(typedEntityName)}`);
    }
    
    // Process all filter args into a formatted string for the entity query
    const filterArgs = Object.entries(filters)
      .filter(([ name, _value ]) => name !== 'fields') // Fields is handled separately from the rest
      .reduce((acc: string[], [name, value]) => {
        const argName = name as keyof QueryIO[typeof typedEntityName]['input']; // type the argument name, some queries do not allow doing where or other filters, so we need to type it
        const argValues = value as FilterValue<typeof typedEntityName, keyof QueryIO[typeof typedEntityName]['input']>;
        
        // Process the filter and add it to accumulator if it's not empty
        const processed = this.processFilter(typedEntityName, argName, argValues);
        if (processed) acc.push(processed);
        
        return acc;
      }, [])
      .join(', ');
    // Handle edge case: don't include empty parentheses when args is empty
    const filtersForQuery = filterArgs ? `(${filterArgs})` : '';

    const queryForEntity = `${String(entityName)}${filtersForQuery} {
      ${fields.join('\n                ')}
    }`;

    return queryForEntity;
  }
    // Get strongly typed entity name
  /**
   * Generic query method that can handle any entity type with proper type safety
   */
  async query<T extends QueryInput>(
    input: T & Record<Exclude<keyof T, keyof QueryInput>, never>,
  ): Promise<QueryOutput<T>> {
    try {
      const entities = Object.entries(input);
      const queryStr = `
        query {
          ${entities
            .map(([entity, filters]) => {
              const entityName = entity as keyof QueryIO;
              const parsedQuery = this.parseEntityQuery({ entityName, filters });
              return parsedQuery;
            }).join('\n          ')}
        }
      `;
      const query = gql`${queryStr}`;
      return this.request<QueryOutput<T>>(query);
    } catch (error) {
      console.error('Error in query', error);
      throw error;
    }
  }
}
