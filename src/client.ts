import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-tag';
import { NetworkName, NETWORK_CONFIG, SUPPORTED_NETWORKS } from './networks';
import type { QueryIO, ExtractFields } from './generated/types';

type QueryInput = {
  [K in keyof QueryIO]?: QueryIO[K]['input'];
};

type QueryOutput<T extends QueryInput> = {
  [K in keyof T & keyof QueryIO]: T[K] extends { fields: (keyof QueryIO[K]['entity'])[] }
    ? QueryIO[K]['wrapper'] extends 'array'
      ? ExtractFields<QueryIO[K]['entity'], T[K]['fields']>[]
      : ExtractFields<QueryIO[K]['entity'], T[K]['fields']>
    : QueryIO[K]['output'];
};

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
              console.log('Mapping entity name: ', entityName);
              const gqlArgs = Object.entries(filters).map(([name, value]) => {
                console.log('Filter name:', name);
                // Check for enum values 
                const probablyEnum = /^[A-Z_](?:[A-Z0-9][A-Z0-9_]*)*$/;
                if (probablyEnum.test(value)) {
                  console.log('Enum value:', value); 
                }
              });
              console.log('gqlArgs for entity');
            }).join('\n')}
        }
      `;


    console.log('queryStr: ', queryStr);



    const query = gql`
        ${queryStr}
      `;

      const response = await this.request<QueryOutput<T>>(query);
      return response;
    } catch (error) {
      console.error('Error in query', error);
      throw error;
    }
  }
}
