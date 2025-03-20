import { gql } from 'graphql-tag';
import { NetworkName, NETWORK_CONFIG, SUPPORTED_NETWORKS } from './networks';
import type { Query } from './generated/types';
import { DocumentNode } from 'graphql';

export class SubsquidClient {
  private clientUrl: string;

  constructor(network: NetworkName) {
    this.clientUrl = this.getSubsquidUrlForNetwork(network);
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
   * Generic request method for GraphQL queries using fetch with type safety
   */
  private request = async <T>(document: DocumentNode): Promise<T> => {
    const response = await fetch(this.clientUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: document.loc?.source.body }),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
    }

    return result.data as T;
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
