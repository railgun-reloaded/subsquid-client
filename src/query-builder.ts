import type { FieldsArgs, FilterValue, QueryIO, QueryInput } from './types'

/**
 *
 */
export class QueryBuilder {
  /**
   *
   */
  constructor () {}
  /**
   * Converts a JSON object to a GraphQL arguments string
   * Handles enum values correctly (removes quotes from values that appear to be enums)
   *
   * This method is needed for complex nested objects like 'where' filters
   * @param obj
   */
  jsonToGraphQLArgs (obj: any): string {
    if (!obj) return ''

    /**
     *
     * @param obj
     */
    const processObj = (obj: any): string => {
      if (obj === null || obj === undefined) {
        return 'null'
      }

      if (typeof obj === 'string') {
        // Check if this is likely an enum (all uppercase with underscores and numbers)
        if (/^[A-Z0-9_]+$/.test(obj)) {
          return obj // Return enum without quotes
        } else {
          return JSON.stringify(obj) // Return string with quotes
        }
      }

      if (typeof obj === 'number' || typeof obj === 'boolean') {
        return String(obj)
      }

      if (Array.isArray(obj)) {
        const items = obj.map((item) => processObj(item)).join(', ')
        return `[${items}]`
      }

      if (typeof obj === 'object') {
        const pairs = Object.entries(obj)
          .map(([key, value]) => `${key}: ${processObj(value)}`)
          .join(', ')
        return `{${pairs}}`
      }

      return String(obj)
    }

    return processObj(obj)
  }

  /**
   * Process a filter for a GraphQL query, handling different filter types appropriately
   * @param entityName - The entity being queried (e.g., 'tokens', 'commitments')
   * @param filterName - The filter name (e.g., 'where', 'orderBy', 'limit')
   * @param value - The filter value with appropriate type based on FilterValue
   * @returns Formatted GraphQL argument string
   */

  /**
   *
   * @param _entityName
   * @param filterName
   * @param value
   */
  processFilter<K extends keyof QueryIO, F extends keyof QueryIO[K]['input']>(
    _entityName: K,
    filterName: F,
    value: FilterValue<K, F>
  ): string {
    switch (filterName) {
      case 'where':
        return value ? `where: ${this.jsonToGraphQLArgs(value)}` : ''

      case 'orderBy':
        if (Array.isArray(value) && value.length > 0) {
          const orderByValues = value
            .map(order => String(order).replace(/["']/g, ''))
            .join(', ')
          return `orderBy: [${orderByValues}]`
        }
        return ''

      // All of these are `number`
      case 'limit':
      case 'offset':
      case 'first':
        return value !== undefined ? `${String(filterName)}: ${value}` : ''
      case 'after':
        return value ? `after: ${JSON.stringify(value)}` : ''

      default:
        return ''
    }
  }

  /**
   * Parse a single entity query from the input object
   * @param entityName.entityName
   * @param entityName - The entity name (e.g., 'tokens')
   * @param filters - The filters for the entity (e.g., { fields: ['id', 'tokenType', 'tokenAddress', 'tokenSubID'], limit: 5 })
   * @param entityName.filters
   * @returns Formatted GraphQL query string
   */
  private parseEntityQuery<K extends keyof QueryIO>(
    { entityName, filters }: { entityName: K, filters: QueryIO[K]['input'] }
  ): string {
    // We know entity name is a key of QueryIO, force a cast type over it
    const typedEntityName = entityName as keyof QueryIO
    const fields = filters.fields as (FieldsArgs<typeof typedEntityName>)[]

    // Check that query has actually some fields requested data, if not is not a valid gql query
    if (!fields || !Array.isArray(fields) || fields.length === 0) {
      throw new Error(`Query can't have empty return data for entity ${String(typedEntityName)}`)
    }

    const filterArgs = Object.entries(filters)
      .filter(([name, _value]) => name !== 'fields') // Fields is handled separately from the rest
      .reduce((acc: string[], [name, value]) => {
        const argName = name as keyof QueryIO[typeof typedEntityName]['input'] // type the argument name, some queries do not allow doing where or other filters, so we need to type it
        const argValues = value as FilterValue<typeof typedEntityName, keyof QueryIO[typeof typedEntityName]['input']>

        const processed = this.processFilter(typedEntityName, argName, argValues)
        if (processed) acc.push(processed)

        return acc
      }, [])
      .join(', ')
    // Handle edge case: don't include empty parentheses when args is empty
    const filtersForQuery = filterArgs ? `(${filterArgs})` : ''

    const queryForEntity = `${String(entityName)}${filtersForQuery} {
      ${fields.join('\n                ')}
    }`

    return queryForEntity
  }

  /**
   *
   * @param input
   */
  build<T extends QueryInput>(input: T & Record<Exclude<keyof T, keyof QueryInput>, never>): string {
    const entities = Object.entries(input)
    const queryStr = `
      query {
        ${entities
          .map(([entity, filtersForQuery]) => {
            const entityName = entity as keyof QueryIO
            const filters = filtersForQuery as QueryIO[typeof entityName]['input']
            const parsedQuery = this.parseEntityQuery({
              entityName,
              filters
            })
            return parsedQuery
          }).join('\n          ')}
      }  
      `
    return queryStr
  }
}
