import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { SubsquidClient } from '../src/client'
import type { QueryInput } from '../src/types'

describe('Subsquid Client', async (t) => {
  it('Should initialize with valid network config', async (t) => {
    const client = new SubsquidClient({ network: 'ethereum' })
    assert.ok(client instanceof SubsquidClient)
    const query: QueryInput = {
      unshields: {
        fields: ['id', 'foobar', { token: ['id', 'tokenAddress'] }]
      }
    }
    const result = await client.query(query)
  })
})
