import type { NetworkName } from './networks'
import { NETWORK_CONFIG, SUPPORTED_NETWORKS } from './networks'
import { QueryBuilder } from './query-builder'

/**
 * Client for interacting with the Subsquid GraphQL API
 */
export class SubsquidClient {
  /**
   * The query builder instance for building GraphQL queries
   */
  private queryBuilder: QueryBuilder
  /**
   * The URL endpoint for the Subsquid GraphQL API
   */
  private clientUrl: string
  /**
   * Creates a new SubsquidClient instance
   * @param network - The blockchain network to connect to
   */
  constructor (network: NetworkName) {
    this.queryBuilder = new QueryBuilder()
    this.clientUrl = this.getSubsquidUrlForNetwork(network)
  }

  /**
   * Gets the Subsquid URL for the specified network
   * @param network - The blockchain network to get the URL for
   * @returns The Subsquid URL for the specified network
   */
  private getSubsquidUrlForNetwork = (network: NetworkName): string => {
    const configUrl = NETWORK_CONFIG[network]
    if (!configUrl) {
      throw new Error(
        `Unsupported network: ${network}. Supported networks are: ${SUPPORTED_NETWORKS.join(', ')}`
      )
    }
    return configUrl
  }

  /**
   * Generic request method for GraphQL queries using fetch with type safety
   * @param query - The GraphQL query to execute
   * @returns Promise that resolves to the query result
   */
  request = async <T>(query: string): Promise<T> => {
    try {
      const requestBody = JSON.stringify({ query })

      const response = await fetch(this.clientUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      })

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`)
      }

      const result = await response.json()

      if (result.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`)
      }

      return result.data as T
    } catch (error) {
      console.error('Error in request', error)
      throw error
    };
  }

  /**
   * Generic query method that can handle any entity type with proper type safety
   * @param input - The query input to build and execute
   * @returns Promise that resolves to the query result
   */
  async query (
    input: string
  ): Promise<unknown> {
    try {
      const queryStr = this.queryBuilder.build(input)
      return this.request(queryStr)
    } catch (error) {
      console.error('Error in query', error)
      throw error
    }
  }
}
