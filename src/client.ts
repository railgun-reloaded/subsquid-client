import type { SubsquidClientOptions } from './networks'
import { NETWORK_CONFIG, SUPPORTED_NETWORKS } from './networks'
import { queryBuilder } from './query-builder'

/**
 * Client for interacting with the Subsquid GraphQL API
 */
export class SubsquidClient {
  /**
   * The URL endpoint for the Subsquid GraphQL API
   */
  private clientUrl: string

  /**
   * Creates a new SubsquidClient instance
   * @param options - Configuration options for the client
   */
  constructor (options: SubsquidClientOptions) {
    this.clientUrl = this.getSubsquidUrl(options)
  }

  /**
   * Gets the Subsquid URL from the provided options
   * @param options - Configuration options for the client
   * @returns The Subsquid URL to use
   */
  private getSubsquidUrl = (options: SubsquidClientOptions): string => {
    if (!(options.network) && !(options.customSubsquidUrl)) {
      throw new Error('Either network or customSubsquidUrl must be provided')
    }

    if (options.network) {
      const networkUrl = NETWORK_CONFIG[options.network as keyof typeof NETWORK_CONFIG]
      if (!networkUrl) {
        throw new Error(
          `Unsupported network: ${options.network}. Supported networks are: ${SUPPORTED_NETWORKS.join(', ')}`
        )
      }
      return networkUrl
    } else {
      const { customSubsquidUrl } = options
      return new URL(customSubsquidUrl!).toString()
    }
  }

  /**
   * Generic request method for GraphQL queries using fetch with type safety
   * @param query - The GraphQL query to execute
   * @returns Promise that resolves to the query result
   */
  async request <T>(query: string): Promise<T> {
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
      const queryStr = queryBuilder.build(input)
      return this.request(queryStr)
    } catch (error) {
      console.error('Error in query', error)
      throw error
    }
  }
}
