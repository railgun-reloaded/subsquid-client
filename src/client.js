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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUtwRCxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsQ0FBQyxHQUFXLEVBQVcsRUFBRTtJQUNyRCxPQUFPLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMzQyxDQUFDLENBQUM7QUFFRixNQUFNLE9BQU8sY0FBYztJQUNqQixNQUFNLENBQWdCO0lBRTlCLFlBQVksR0FBVztRQUNyQixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDakMsTUFBTSxJQUFJLEtBQUssQ0FDYixpRkFBaUYsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQ2xILENBQUM7UUFDSixDQUFDO1FBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxPQUFPLEdBQUcsS0FBSyxFQUFLLFFBQXNCLEVBQUUsU0FBZSxFQUFjLEVBQUU7UUFDekUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBSSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDckQsQ0FBQyxDQUFDO0lBRUY7OztPQUdHO0lBQ0ssaUJBQWlCLENBQUMsR0FBUTtRQUNoQyxJQUFJLENBQUMsR0FBRztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBRXBCLCtDQUErQztRQUMvQyxNQUFNLFVBQVUsR0FBRyxDQUFDLEdBQVEsRUFBVSxFQUFFO1lBQ3RDLElBQUksR0FBRyxLQUFL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