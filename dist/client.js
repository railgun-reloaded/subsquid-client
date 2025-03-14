import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-tag';
import { VALID_SUBSQUID_URLS } from './networks.js';
export const isNetworkValid = (url) => {
    return VALID_SUBSQUID_URLS.includes(url);
};
export class SubsquidClient {
    client;
    constructor(url) {
        if (!url || !isNetworkValid(url)) {
            throw new Error(`Invalid Subsquid URL. Please use one of the predefined URLs from networks.ts: ${VALID_SUBSQUID_URLS.join(', ')}`);
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDaEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNsQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLcEQsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHLENBQUMsR0FBVyxFQUFXLEVBQUU7SUFDckQsT0FBTyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDM0MsQ0FBQyxDQUFDO0FBRUYsTUFBTSxPQUFPLGNBQWM7SUFDakIsTUFBTSxDQUFnQjtJQUU5QixZQUFZLEdBQVc7UUFDckIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQ2IsaUZBQWlGLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUNsSCxDQUFDO1FBQ0osQ0FBQztRQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsT0FBTyxHQUFHLEtBQUssRUFBSyxRQUFzQixFQUFFLFNBQWUsRUFBYyxFQUFFO1FBQ3pFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUksUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3JELENBQUMsQ0FBQztJQUVGOzs7T0FHRztJQUNLLGlCQUFpQixDQUFDLEdBQVE7UUFDaEMsSUFBSSxDQUFDLEdBQUc7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUVwQiwrQ0FBK0M7UUFDL0MsTUFBTSxVQUFVLEdBQUcsQ0FBQyxHQUFRLEVBQVUsRUFBRTtZQUN0QyxJQUFJLEdB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