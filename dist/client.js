import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-tag';
import { NetworkName, ETHEREUM_URL, ETHEREUM_SEPOLIA_URL, BSC_URL, POLYGON_URL, ARBITRUM_URL, } from './networks.js';
// export const isNetworkValid = (url: string): boolean => {
//   return VALID_SUBSQUID_URLS.includes(url);
// };
export const subsquidUrlForNetwork = (networkName) => {
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
    client;
    constructor(network) {
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
    request = async (document, variables) => {
        return this.client.request(document, variables);
    };
    /**
     * Converts a JSON object to a GraphQL arguments string
     * Handles enum values correctly (removes quotes from values that appear to be enums)
     */
    jsonToGraphQLArgs(obj) {
        if (!obj)
            return '';
        // Replace with a completely new implementation
        const processObj = (obj) => {
            if (obj === null || obj === undefined) {
                return 'null';
            }
            if (typeof obj === 'string') {
                // Check if this is likely an enum (all uppercase with underscores and numbers)
                if (/^[A-Z0-9_]+$/.test(obj)) {
                    return obj; // Return enum without quotes
                }
                else {
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
    async query(entity, fields, where, orderBy, limit = 1000, offset) {
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
            const query = gql `
        ${queryStr}
      `;
            const response = await this.request(query);
            return response[entity];
        }
        catch (error) {
            console.error(`Error in query for ${String(entity)}:`, error);
            throw error;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDaEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNsQyxPQUFPLEVBQ0wsV0FBVyxFQUNYLFlBQVksRUFDWixvQkFBb0IsRUFDcEIsT0FBTyxFQUNQLFdBQVcsRUFDWCxZQUFZLEdBQ2IsTUFBTSxlQUFlLENBQUM7QUFLdkIsNERBQTREO0FBQzVELDhDQUE4QztBQUM5QyxLQUFLO0FBRUwsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUcsQ0FBQyxXQUF3QixFQUFVLEVBQUU7SUFDeEUsUUFBUSxXQUFXLEVBQUUsQ0FBQztRQUNwQixLQUFLLFdBQVcsQ0FBQyxRQUFRO1lBQ3ZCLE9BQU8sWUFBWSxDQUFDO1FBQ3RCLEtBQUssV0FBVyxDQUFDLGVBQWU7WUFDOUIsT0FBTyxvQkFBb0IsQ0FBQztRQUM5QixLQUFLLFdBQVcsQ0FBQyxRQUFRO1lBQ3ZCLE9BQU8sT0FBTyxDQUFDO1FBQ2pCLEtBQUssV0FBVyxDQUFDLE9BQU87WUFDdEIsT0FBTyxXQUFXLENBQUM7UUFDckIsS0FBSyxXQUFXLENBQUMsUUFBUTtZQUN2QixPQUFPLFlBQVksQ0FBQztRQUN0QixLQUFLLFdBQVcsQ0FBQyxXQUFXLENBQUM7UUFDN0IsS0FBSyxXQUFXLENBQUMsT0FBTyxDQUFDO1FBQ3pCO1lBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7QUFDSCxDQUFDLENBQUM7QUFFRixNQUFNLE9BQU8sY0FBYztJQUNqQixNQUFNLENBQWdCO0lBRTlCLFlBQVksT0FBb0I7UUFDOUIsTUFBTSxHQUFHLEdBQUcscUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0Msc0NBQXNDO1FBQ3RDLHFCQUFxQjtRQUNy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