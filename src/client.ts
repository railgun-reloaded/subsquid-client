import { queryBuilder } from './query-builder'
import type { QueryInput, QueryOutput, RequestOptions, StrictQueryInput } from './types'

/**
 * Client for interacting with the Subsquid GraphQL API
 */
export class SubsquidClient {
  /**
   * The URL endpoint for the Subsquid GraphQL API
   */
  #clientUrl: URL

  /**
   * Creates a new SubsquidClient instance
   * @param options - Configuration options for the client
   * @param clientUrl
   */
  constructor (clientUrl: URL | string) {
    this.#clientUrl = new URL(clientUrl)
  }

  /**
   * Generic request method for GraphQL queries using fetch with type safety
   * @param query - The GraphQL query options
   * @param query.query - The GraphQL query string to execute
   * @param query.operationName - Optional name of the GraphQL operation
   * @param query.variables - Optional variables to pass to the query
   * @param query.extensions - Optional extensions to pass to the query
   * @returns Promise that resolves to the query result
   */
  async request ({
    query,
    operationName,
    variables,
    extensions
  }: RequestOptions): Promise<unknown> {
    const requestBody = JSON.stringify({
      query,
      operationName,
      variables,
      extensions
    })

    const response = await fetch(this.#clientUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    })

    const result = await response.json()

    if (!response.ok && !result.errors) {
      throw new Error(`Subsquid Request Error: ${response.status} ${response.statusText}`)
    }

    if (result.errors) {
      throw new Error('Subsquid GraphQL Error', { cause: result.errors })
    }

    return result.data
  }

  /**
   * Generic query method that can handle any entity type with proper type safety
   * @param input - The query input to build and execute
   * @returns Promise that resolves to the query result
   */
  async query<const T extends QueryInput> (
    input: StrictQueryInput<T>
  ): Promise<QueryOutput<T>> {
    const queryStr = queryBuilder.build(input)
    const result = await this.request({ query: queryStr })
    return result as QueryOutput<T>
  }
}
