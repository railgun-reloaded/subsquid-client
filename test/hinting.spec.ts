// @ts-nocheck
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { SubsquidClient } from '../src/client'

describe('Subsquid Client', async (t) => {
  it('Should initialize with valid network config', () => {
    const client = new SubsquidClient({ network: 'ethereum' })
    assert.ok(client instanceof SubsquidClient)
  })
})
