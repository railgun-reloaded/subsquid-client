
import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-tag';
import { ETHEREUM_URL } from './networks.js';

export { gql }; // CHANGE THIS

export class SubsquidClient {
    private client: GraphQLClient;

    constructor() {
        this.client = new GraphQLClient(ETHEREUM_URL);
    }
    
    request = async (document: string | any): Promise<any> => {
        return this.client.request(document);
    }
}
