import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-tag';
import { VALID_SUBSQUID_URLS } from './networks.js';

export { gql };

// Define basic types for the Railgun entities
export type Token = {
  id: string;
  tokenType: string;
  tokenSubID: string;
  tokenAddress: string;
};

export type Nullifier = {
  id: string;
  blockNumber: string;
  nullifier: string;
  transactionHash: string;
  blockTimestamp: string;
  treeNumber: number;
};

export type Unshield = {
  id: string;
  blockNumber: string;
  to: string;
  transactionHash: string;
  fee: string;
  blockTimestamp: string;
  amount: string;
  eventLogIndex: string;
  token: Token;
};

export type Commitment = {
  id: string;
  treeNumber: number;
  batchStartTreePosition: number;
  treePosition: number;
  blockNumber: string;
  transactionHash: string;
  blockTimestamp: string;
  commitmentType: string;
  hash: string;
  // Additional fields will be included based on the commitment type
  [key: string]: any;
};

export type Transaction = {
  id: string;
  blockNumber: string;
  transactionHash: string;
  blockTimestamp: string;
  // Additional fields
  [key: string]: any;
};

export type CommitmentPreimage = {
  id: string;
  npk: string;
  token: Token;
  value: string;
};

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

  // Add a generic query method that can handle any entity type
  async query<T>(
    entity: string,
    fields: string[],
    where?: Record<string, any>,
    orderBy?: string[],
    limit: number = 1000,
    offset?: number,
  ): Promise<T[]> {
    // Construct the where, orderBy, limit, and offset arguments
    const whereArg = where ? `where: ${JSON.stringify(where).replace(/"([^"]+)":/g, '$1:')}` : '';
    const orderByArg = orderBy?.length ? `orderBy: [${orderBy.join(', ')}]` : '';
    const limitArg = `limit: ${limit}`;
    const offsetArg = offset !== undefined ? `offset: ${offset}` : '';

    // Combine all arguments
    const args = [whereArg, orderByArg, limitArg, offsetArg].filter(Boolean).join(', ');

    // Build the query
    const queryString = `
      query Get${entity}(${where ? '$where: JSON' : ''}) {
        ${entity}(${args}) {
          ${fields.join('\n          ')}
        }
      }
    `;

    const query = gql`
      ${queryString}
    `;

    // Execute the query
    const response = await this.request<Record<string, T[]>>(
      query,
      where ? { where: JSON.stringify(where) } : undefined,
    );

    return response[entity];
  }

  // Example method for commitment preimages
  async getCommitmentPreimages(
    limit: number = 10,
    where?: any,
    orderBy?: string[],
  ): Promise<CommitmentPreimage[]> {
    return this.query<CommitmentPreimage>(
      'commitmentPreimages',
      ['id', 'npk', 'value', 'token { id tokenType tokenAddress tokenSubID }'],
      where,
      orderBy,
      limit,
    );
  }
}
