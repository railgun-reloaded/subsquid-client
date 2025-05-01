import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { SubsquidClient } from '../src/client'

describe('Subsquid Client', async (_t) => {
  it('Should initialize with valid network config', async () => {
    const client = new SubsquidClient({ network: 'ethereum' })
    assert.ok(client instanceof SubsquidClient)
    const response = await client.query({
      unshields: {
        fields: [
          'blockNumber',
          {
            token: ['id'] as const
          }
        ] as const
      }
    })
    const expectedLength = 34396
    const { unshields } = response
    console.log('response: ', unshields.length)
    assert.ok(unshields.length >= expectedLength)
  })
})
