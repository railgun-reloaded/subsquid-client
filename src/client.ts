import { QueryBuilder } from './query-builder';
import { NetworkName, NETWORK_CONFIG, SUPPORTED_NETWORKS } from './networks';

export class SubsquidClient {
  private queryBuilder: QueryBuilder;
  private clientUrl: string;
  constructor(network: NetworkName) {
    this.queryBuilder = new QueryBuilder();
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
  request = async <T>(query: string): Promise<T> => {
    try {
      const requestBody = JSON.stringify({ query });
      
      const response = await fetch(this.clientUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
  
      const result = await response.json();
  
      if (result.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
      }
  
      return result.data as T;
    } catch(error) {
      console.error('Error in request', error);
      throw error;
    };
  };

  /**
   * Generic query method that can handle any entity type with proper type safety
   */
  // async query(input: string): Promise<unknown>  
  async query(
    input: string,
  ): Promise<unknown> {
    try {
      const queryStr = this.queryBuilder.build(input);
      return this.request(queryStr);
    } catch (error) {
      console.error('Error in query', error);
      throw error;
    }
  }
}
