import type { SubsquidClientOptions } from './networks'
import { NETWORK_CONFIG, SUPPORTED_NETWORKS } from './networks'
import { queryBuilder } from './query-builder'
import type { QueryInput, QueryOutput, StrictQueryInput } from './types'

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
  private getSubsquidUrl(options: SubsquidClientOptions): string {
    if ('network' in options) {
      const networkUrl = NETWORK_CONFIG[options.network as keyof typeof NETWORK_CONFIG]
      if (!networkUrl) {
        throw new Error(
          `Unsupported network: ${options.network}. Supported networks are: ${SUPPORTED_NETWORKS.join(', ')}`
        )
      }
      return networkUrl
    }
    if ('customSubsquidUrl' in options) {
      const { customSubsquidUrl } = options
      if (!customSubsquidUrl || customSubsquidUrl.trim() === '') {
        throw new Error('customSubsquidUrl cannot be empty')
      }

      try {
        const url = new URL(customSubsquidUrl)
        return url.toString()
      } catch (error) {
        throw new Error(`Invalid URL format: ${customSubsquidUrl}`)
      }
    }
    throw new Error(
      'Invalid configuration. Provide either { network } or { customSubsquidUrl }.'
    )
  }

  /**
   * Generic request method for GraphQL queries using fetch with type safety
   * @param query - The GraphQL query to execute
   * @returns Promise that resolves to the query result
   */
  async request<T>(query: string): Promise<T> {
    const requestBody = JSON.stringify({ query })
    const response = await fetch(this.clientUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    })

    if (!response.ok) {
      throw new Error(`Network request failed: ${response.status} ${response.statusText}`)
    }

    const result = await response.json()
    return result.data as T
  }

  /**
   * Generic query method that can handle any entity type with proper type safety
   * @param input - The query input to build and execute
   * @returns Promise that resolves to the query result
   */
  async query<T extends QueryInput> (
    input: StrictQueryInput<T>
  ): Promise<QueryOutput<T>> {
    const queryStr = queryBuilder.build(input)
    return this.request<QueryOutput<T>>(queryStr)
  }
}
