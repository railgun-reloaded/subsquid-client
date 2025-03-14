import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-tag';
import { VALID_SUBSQUID_URLS } from './networks.js';

// Import generated types
import type { Query } from './generated/types.js';

// Re-export the gql tag for use in other files
export { gql };

export const isNetworkValid = (url: string): boolean => {
  return VALID_SUBSQUID_URLS.includes(url);
};

export class SubsquidClient {
  private client: GraphQLClient;

  constructor(url: string) {
    if (!url || !isNetworkValid(url)) {
      throw new Error(
        `Invalid Subsquid URL. Please use one of the predefined URLs from networks.ts: ${VALID_SUBSQUID_URLS.join(', ')}`,
      );
    }

    this.client = new GraphQLClient(url);
  }

  /**
   * Generic request method for GraphQL queries with type safety
   */
  request = async <T>(document: string | any, variables?: any): Promise<T> => {
    return this.client.request<T>(document, variables);
  };

  /**
   * Generic query method that can handle any entity type with proper type safety
   */
  async query<K extends keyof Query>(
    entity: K,
    fields: string[],
    where?: any,
    orderBy?: string[],
    limit: number = 1000,
    offset?: number,
  ): Promise<Query[K]> {
    // Build the query with proper GraphQL syntax
    const whereArg = where ? `where: ${JSON.stringify(where).replace(/"([^"]+)":/g, '$1:')}` : '';
    const orderByArg = orderBy?.length ? `orderBy: [${orderBy.join(', ')}]` : '';
    const limitArg = `limit: ${limit}`;
    const offsetArg = offset !== undefined ? `offset: ${offset}` : '';

    // Combine all arguments
    const args = [whereArg, orderByArg, limitArg, offsetArg].filter(Boolean).join(', ');

    // Build the query string with typed variables
    const queryString = `
      query Get${String(entity)}(${where ? '$where: JSON' : ''}) {
        ${String(entity)}(${args}) {
          ${fields.join('\n          ')}
        }
      }
    `;

    const query = gql`
      ${queryString}
    `;

    // Execute the query
    const response = await this.request<Record<string, Query[K]>>(
      query,
      where ? { where: JSON.stringify(where) } : undefined,
    );

    return response[entity as string] as Query[K];
  }
}
