import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-tag';
import { VALID_SUBSQUID_URLS } from './networks.js';

export { gql }; // CHANGE THIS

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

  request = async (document: string | any): Promise<any> => {
    return this.client.request(document);
  };
}
