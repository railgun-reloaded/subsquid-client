import type { FieldSelector } from './generated/types'
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
 * @param field - The field to process (string or object, matching FieldSelector structure)
 * @returns Formatted GraphQL field string, empty string or throw an error for invalid structure
 */
function processField (field: FieldSelector<any>): string {
  if (typeof field === 'string') {
    return field
  }

  // If field is an object, it represents a nested selection
  if (typeof field === 'object' && field !== null && !Array.isArray(field)) {
    const entries = Object.entries(field)

    // Check if there is exactly one entry AND that entry exists.
    // This combined check helps TypeScript understand the structure.
    if (entries.length === 1 && entries[0] !== undefined) {
      const [fieldName, subfieldsValue] = entries[0]

      // Ensure the value for the nested field is an array of sub-selectors
      // This aligns with the structure of FieldSelector for nested fields: { [Key]: FieldSelector<...>[] }
      if (Array.isArray(subfieldsValue)) {
        // Process the subfields recursively
        // Cast subfieldsValue to Array<FieldSelector<any>> for processField's argument type
        const processedSubfields = (subfieldsValue as FieldSelector<any>[]).map(processField).join('\n          ') // Recursive call

        return `${fieldName} {\n          ${processedSubfields}\n        }`
      } else {
        // This case indicates an object key exists, but its value isn't an array as expected by FieldSelector for nested fields
        console.warn(`Subfields value for nested field "${fieldName}" must be an array:`, subfieldsValue)
        return ''
      }
    } else {
      // Object is empty, has multiple keys, or entries[0] was undefined somehow
      console.warn('Unexpected object structure in fields array - expected single key:', field)
      return ''
    }
  }

  // This warning indicates an input that doesn't match the expected FieldSelector structure (string or simple object).
  console.warn('Unexpected field type in fields array - expected string or nested object:', field)
  return String(field)
}

/**
 * Parse a single entity query from the input object
 * @param params - The parameters for parsing the entity query
 * @param params.entityName - The entity name (e.g., 'tokens')
 * @param params.filters - The filters for the entity. Note: filters.fields is the raw input, which can be FieldSelector<Entity>[] or readonly FieldSelector<Entity>[] (when 'as const' is used). The builder only needs the general array type for processing.
 * @returns Formatted GraphQL query string
 */
function parseEntityQuery <K extends keyof EntityQueryMap> (
  { entityName, filters }: { entityName: K, filters: EntityQueryMap[K]['input'] }
): string {
  const typedEntityName = entityName as keyof EntityQueryMap

  // Ensure filters and fields exist and are an array, cast.
  const fields = filters?.fields as FieldSelector<any>[]

  if (!fields || !Array.isArray(fields) || fields.length === 0) {
    throw new Error(`Query for entity "${String(typedEntityName)}" must specify at least one field in the 'fields' array.`)
  }

  const filterArgs = Object.entries(filters || {})
    .filter(([name, _value]) => name !== 'fields')
    .reduce((acc: string[], [name, value]) => {
      // Cast name to the expected keyof type for FilterValue
      const argName = name as keyof EntityQueryMap[typeof typedEntityName]['input']

      // Pass value as FilterValue type for processFilter
      const argValues = value as FilterValue<typeof typedEntityName, typeof argName>

      const processed = processFilter(typedEntityName, argName, argValues)
      if (processed) acc.push(processed)

      return acc
    }, [])
    .join(', ')

  const filtersForQuery = filterArgs ? `(${filterArgs})` : ''
  const processedFields = fields.map(processField).join('\n    ')
  const queryForEntity = `${String(entityName)}${filtersForQuery} {
    ${processedFields}
  }`

  return queryForEntity
}

/**
 * Builds a complete GraphQL query string from the input object containing one or more entity queries.
 * @param input - The query input object. Should have keys that are valid EntityQueryMap keys.
 * @returns A complete GraphQL query string.
 */
function build <T extends QueryInput> (input: T & Record<Exclude<keyof T, keyof QueryInput>, never>): string {
  const entities = Object.entries(input) as Array<[keyof T & keyof EntityQueryMap, T[keyof T & keyof EntityQueryMap]]>

  if (entities.length === 0) {
    throw new Error('Query input must contain at least one entity query.')
  }

  const queryStr = `
    query {
      ${entities
        .map(([entity, filtersForQuery]) => {
          const entityName = entity as keyof EntityQueryMap
          const filters = filtersForQuery as EntityQueryMap[typeof entityName]['input']

           if (!filters) {
                throw new Error(`Filters object is missing or undefined for entity "${String(entityName)}". Did you forget to provide the query object { fields: [...], ... }?`)
           }

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
