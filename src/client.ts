import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-tag';
import {
  NetworkName,
  ETHEREUM_URL,
  ETHEREUM_SEPOLIA_URL,
  BSC_URL,
  POLYGON_URL,
  ARBITRUM_URL,
} from './networks.js';

// Import generated types
import type { Query } from './generated/types';

// export const isNetworkValid = (url: string): boolean => {
//   return VALID_SUBSQUID_URLS.includes(url);
// };

export const subsquidUrlForNetwork = (networkName: NetworkName): string => {
  switch (networkName) {
    case NetworkName.Ethereum:
      return ETHEREUM_URL;
    case NetworkName.EthereumSepolia:
      return ETHEREUM_SEPOLIA_URL;
    case NetworkName.BNBChain:
      return BSC_URL;
    case NetworkName.Polygon:
      return POLYGON_URL;
    case NetworkName.Arbitrum:
      return ARBITRUM_URL;
    case NetworkName.PolygonAmoy:
    case NetworkName.Hardhat:
    default:
      throw new Error('No Graph API hosted service for this network');
  }
};

export class SubsquidClient {
  private client: GraphQLClient;

  constructor(network: NetworkName) {
    const url = subsquidUrlForNetwork(network);
    // if (!url || !isNetworkValid(url)) {
    //   throw new Error(
    //     `Invalid Subsquid URL. Please use one of the predefined URLs from networks.ts: ${VALID_SUBSQUID_URLS.join(', ')}`,
    //   );
    // }

    this.client = new GraphQLClient(url);
  }

  /**
   * Generic request method for GraphQL queries with type safety
   */
  request = async <T>(document: string | any, variables?: any): Promise<T> => {
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
  async query<K extends keyof Query>(
    entity: K,
    fields: string[],
    where?: any,
    orderBy?: string[],
    limit: number = 1000,
    offset?: number,
  ): Promise<Query[K]> {
    try {
      const whereClauseStr = where ? `where: ${this.jsonToGraphQLArgs(where)}` : '';

      const orderByClauseStr = orderBy?.length
        ? `orderBy: [${orderBy.map((order) => order.replace(/["']/g, '')).join(', ')}]`
        : '';

      const limitClauseStr = limit !== undefined ? `limit: ${limit}` : '';
      const offsetClauseStr = offset !== undefined ? `offset: ${offset}` : '';

      // Combine all arguments
      const args = [whereClauseStr, orderByClauseStr, limitClauseStr, offsetClauseStr]
        .filter(Boolean)
        .join(', ');

      // Build query string
      const queryStr = `
        query {
          ${String(entity)}(${args}) {
            ${fields.join('\n            ')}
          }
        }
      `;

      const query = gql`
        ${queryStr}
      `;

      const response = await this.request<Record<string, Query[K]>>(query);

      return response[entity as string] as Query[K];
    } catch (error) {
      console.error(`Error in query for ${String(entity)}:`, error);
      throw error;
    }
  }
}
