import type { EntityQueryMap, FilterValue, QueryInput } from './types'

/**
 * Converts a JSON object to a GraphQL arguments string
 * Handles enum values correctly (removes quotes from values that appear to be enums)
 *
 * This method is needed for complex nested objects like 'where' filters
 * @param obj - The object to convert to GraphQL arguments
 * @returns A GraphQL arguments string
 */
function jsonToGraphQLArgs (obj: any): string {
  if (!obj) return ''

  /**
   * Processes an object and converts it to a GraphQL-compatible string
   * @param obj - The object to process
   * @returns A GraphQL-compatible string representation of the object
   */
  function processObj (obj: any): string {
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
 * @param _entityName - The entity being queried (e.g., 'tokens', 'commitments')
 * @param filterName - The filter name (e.g., 'where', 'orderBy', 'limit')
 * @param value - The filter value with appropriate type based on FilterValue
 * @returns Formatted GraphQL argument string
 */
function processFilter<K extends keyof EntityQueryMap, F extends keyof EntityQueryMap[K]['input']> (
  _entityName: K,
  filterName: F,
  value: FilterValue<K, F>
): string {
  switch (filterName) {
    case 'where':
      return value ? `where: ${jsonToGraphQLArgs(value)}` : ''

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
 * Processes a field for GraphQL query, handling nested objects
 * @param field - The field to process (string or object)
 * @returns Formatted GraphQL field string
 */
function processField (field): string {
  if (typeof field === 'string') {
    return field
  }

  // If field is an object, it represents a nested selection
  if (typeof field === 'object' && field !== null && !Array.isArray(field)) {
    const entries = Object.entries(field)

    console.log('Entries: ', entries)

    if (entries.length !== 1) {
      console.warn('Unexpected object structure in fields array - expected single key:', field)
      return ''
    }

    const [fieldName, subfieldsArray] = entries[0]
    if (!Array.isArray(subfieldsArray)) {
      console.warn('Subfields value must be an array for nested field:', subfieldsArray)
      return ''
    }

    const processedSubfields = subfieldsArray.map(processField).join('\n          ') // Recursive call

    return `${fieldName} {\n          ${processedSubfields}\n        }`
  }

  console.warn('Unexpected field type in fields array - expected string or nested object:', field)
  return String(field)
}

/**
 * Parse a single entity query from the input object
 * @param params - The parameters for parsing the entity query
 * @param params.entityName - The entity name (e.g., 'tokens')
 * @param params.filters - The filters for the entity
 * @returns Formatted GraphQL query string
 */
function parseEntityQuery <K extends keyof EntityQueryMap> (
  { entityName, filters }: { entityName: K, filters: EntityQueryMap[K]['input'] }
): string {
  const typedEntityName = entityName as keyof EntityQueryMap
  const fields = filters.fields

  console.log('parseEntityQuery fields: ', fields)

  if (!fields || !Array.isArray(fields) || fields.length === 0) {
    throw new Error(`Query can't have empty return data for entity ${String(typedEntityName)}`)
  }

  const filterArgs = Object.entries(filters)
    .filter(([name, _value]) => name !== 'fields')
    .reduce((acc: string[], [name, value]) => {
      const argName = name as keyof EntityQueryMap[typeof typedEntityName]['input']
      // Ensure correct type for FilterValue, though this wasn't the source of the error
      const argValues = value as FilterValue<typeof typedEntityName, typeof argName>


      const processed = processFilter(typedEntityName, argName, argValues)
      if (processed) acc.push(processed)

      return acc
    }, [])
    .join(', ')

  const filtersForQuery = filterArgs ? `(${filterArgs})` : ''

  const processedFields = fields.map(processField).join('\n    ')

  console.log('parseEntityQuery processed fields: ', processedFields)

  const queryForEntity = `${String(entityName)}${filtersForQuery} {
    ${processedFields}
  }`

  return queryForEntity
}

/**
 * Builds a complete GraphQL query string from the input
 * @param input - The query input to build
 * @returns A complete GraphQL query string
 */
function build <T extends QueryInput> (input: T & Record<Exclude<keyof T, keyof QueryInput>, never>): string {
  const entities = Object.entries(input)
  const queryStr = `
    query {
      ${entities
        .map(([entity, filtersForQuery]) => {
          const entityName = entity as keyof EntityQueryMap
          const filters = filtersForQuery as EntityQueryMap[typeof entityName]['input']
          const parsedQuery = parseEntityQuery({
            entityName,
            filters
          })
          return parsedQuery
        }).join('\n          ')}
    }
    `
  return queryStr
}

export const queryBuilder = {
  build
}
