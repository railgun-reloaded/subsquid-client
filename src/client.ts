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
   * Generic request method for GraphQL queries
   */
  request = async (document: string | any, variables?: any): Promise<any> => {
    return this.client.request(document, variables);
  };

  /**
   * Fetch nullifiers from the specified block number
   * @param blockNumber The starting block number (inclusive)
   * @param limit Maximum number of nullifiers to return
   */
  async getNullifiers(blockNumber: number = 0, limit: number = 1000): Promise<Nullifier[]> {
    const query = gql`
      query GetNullifiers($blockNumber: BigInt!, $limit: Int!) {
        nullifiers(
          orderBy: [blockNumber_ASC, nullifier_DESC]
          where: { blockNumber_gte: $blockNumber }
          limit: $limit
        ) {
          id
          blockNumber
          nullifier
          transactionHash
          blockTimestamp
          treeNumber
        }
      }
    `;

    const response = await this.request(query, { 
      blockNumber: blockNumber.toString(),
      limit
    });
    
    return response.nullifiers;
  }

  /**
   * Fetch unshields from the specified block number
   * @param blockNumber The starting block number (inclusive)
   * @param limit Maximum number of unshields to return
   */
  async getUnshields(blockNumber: number = 0, limit: number = 1000): Promise<Unshield[]> {
    const query = gql`
      query GetUnshields($blockNumber: BigInt!, $limit: Int!) {
        unshields(
          orderBy: [blockNumber_ASC, eventLogIndex_ASC]
          where: { blockNumber_gte: $blockNumber }
          limit: $limit
        ) {
          id
          blockNumber
          to
          transactionHash
          fee
          blockTimestamp
          amount
          eventLogIndex
          token {
            id
            tokenType
            tokenSubID
            tokenAddress
          }
        }
      }
    `;

    const response = await this.request(query, { 
      blockNumber: blockNumber.toString(),
      limit
    });
    
    return response.unshields;
  }

  /**
   * Fetch basic commitments from the specified block number
   * @param blockNumber The starting block number (inclusive)
   * @param limit Maximum number of commitments to return
   */
  async getCommitments(blockNumber: number = 0, limit: number = 1000): Promise<Commitment[]> {
    const query = gql`
      query GetCommitments($blockNumber: BigInt!, $limit: Int!) {
        commitments(
          orderBy: [blockNumber_ASC, treePosition_ASC]
          where: { blockNumber_gte: $blockNumber }
          limit: $limit
        ) {
          id
          treeNumber
          batchStartTreePosition
          treePosition
          blockNumber
          transactionHash
          blockTimestamp
          commitmentType
          hash
        }
      }
    `;

    const response = await this.request(query, { 
      blockNumber: blockNumber.toString(),
      limit
    });
    
    return response.commitments;
  }
  
  /**
   * Fetch detailed commitments with all type-specific fields
   * @param blockNumber The starting block number (inclusive)
   * @param limit Maximum number of commitments to return
   */
  async getDetailedCommitments(blockNumber: number = 0, limit: number = 1000): Promise<Commitment[]> {
    const query = gql`
      query GetDetailedCommitments($blockNumber: BigInt!, $limit: Int!) {
        commitments(
          orderBy: [blockNumber_ASC, treePosition_ASC]
          where: { blockNumber_gte: $blockNumber }
          limit: $limit
        ) {
          id
          treeNumber
          batchStartTreePosition
          treePosition
          blockNumber
          transactionHash
          blockTimestamp
          commitmentType
          hash
          ... on LegacyGeneratedCommitment {
            encryptedRandom
            preimage {
              id
              npk
              value
              token {
                id
                tokenType
                tokenSubID
                tokenAddress
              }
            }
          }
          ... on LegacyEncryptedCommitment {
            legacyCiphertext: ciphertext {
              id
              ciphertext {
                id
                iv
                tag
                data
              }
              ephemeralKeys
              memo
            }
          }
          ... on ShieldCommitment {
            shieldKey
            fee
            encryptedBundle
            preimage {
              id
              npk
              value
              token {
                id
                tokenType
                tokenSubID
                tokenAddress
              }
            }
          }
          ... on TransactCommitment {
            ciphertext {
              id
              ciphertext {
                id
                iv
                tag
                data
              }
              blindedSenderViewingKey
              blindedReceiverViewingKey
              annotationData
              memo
            }
          }
        }
      }
    `;

    const response = await this.request(query, { 
      blockNumber: blockNumber.toString(),
      limit
    });
    
    return response.commitments;
  }
  
  /**
   * Fetch shield commitments from the specified block number
   * @param blockNumber The starting block number (inclusive)
   * @param limit Maximum number of shield commitments to return
   */
  async getShieldCommitments(blockNumber: number = 0, limit: number = 1000): Promise<Commitment[]> {
    const query = gql`
      query GetShieldCommitments($blockNumber: BigInt!, $limit: Int!) {
        shieldCommitments(
          orderBy: [blockNumber_ASC, treePosition_ASC]
          where: { blockNumber_gte: $blockNumber }
          limit: $limit
        ) {
          id
          treeNumber
          batchStartTreePosition
          treePosition
          blockNumber
          transactionHash
          blockTimestamp
          commitmentType
          hash
          shieldKey
          fee
          encryptedBundle
          preimage {
            id
            npk
            value
            token {
              id
              tokenType
              tokenSubID
              tokenAddress
            }
          }
        }
      }
    `;

    const response = await this.request(query, { 
      blockNumber: blockNumber.toString(),
      limit
    });
    
    return response.shieldCommitments;
  }
  
  /**
   * Fetch transact commitments from the specified block number
   * @param blockNumber The starting block number (inclusive)
   * @param limit Maximum number of transact commitments to return
   */
  async getTransactCommitments(blockNumber: number = 0, limit: number = 1000): Promise<Commitment[]> {
    const query = gql`
      query GetTransactCommitments($blockNumber: BigInt!, $limit: Int!) {
        transactCommitments(
          orderBy: [blockNumber_ASC, treePosition_ASC]
          where: { blockNumber_gte: $blockNumber }
          limit: $limit
        ) {
          id
          treeNumber
          batchStartTreePosition
          treePosition
          blockNumber
          transactionHash
          blockTimestamp
          commitmentType
          hash
          ciphertext {
            id
            ciphertext {
              id
              iv
              tag
              data
            }
            blindedSenderViewingKey
            blindedReceiverViewingKey
            annotationData
            memo
          }
        }
      }
    `;

    const response = await this.request(query, { 
      blockNumber: blockNumber.toString(),
      limit
    });
    
    return response.transactCommitments;
  }

  /**
   * Fetch transactions from the specified block number
   * @param blockNumber The starting block number (inclusive)
   * @param limit Maximum number of transactions to return
   */
  async getTransactions(blockNumber: number = 0, limit: number = 1000): Promise<Transaction[]> {
    const query = gql`
      query GetTransactions($blockNumber: BigInt!, $limit: Int!) {
        transactions(
          orderBy: [blockNumber_ASC]
          where: { blockNumber_gte: $blockNumber }
          limit: $limit
        ) {
          id
          blockNumber
          transactionHash
          blockTimestamp
          merkleRoot
          hasUnshield
          utxoTreeIn
          utxoTreeOut
        }
      }
    `;

    const response = await this.request(query, { 
      blockNumber: blockNumber.toString(),
      limit
    });
    
    return response.transactions;
  }
}
