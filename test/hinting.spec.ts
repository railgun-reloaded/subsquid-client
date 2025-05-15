import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { SubsquidClient } from '../src/client'

describe('Subsquid Client', async (t) => {
  const client = new SubsquidClient({ network: 'ethereum' })

  it('Should query commitments with fragments and provide discriminated type safety', async () => {
    const limit = 10
    const fromBlock = '17000000'
    const { commitments } = await client.query({
      commitments: {
        limit,
        fields: [
          'id',
          'blockNumber',
          'treeNumber',
          'treePosition',
          '__typename',
          {
            '... on ShieldCommitment': [
              'shieldKey',
              'fee',
              {
                preimage: [ // Nested field
                  'npk',
                  'value',
                  {
                    token: [ // Nested nested field
                      'id',
                      'tokenType',
                      'tokenAddress',
                      'tokenSubID'
                    ] as const
                  }
                ] as const
              },
            ] as const
          },
          {
            '... on LegacyEncryptedCommitment': [
              {
                ciphertext: [
                  {
                    ciphertext: [
                      'iv', 'tag', 'data',
                    ] as const
                  },
                  'ephemeralKeys',
                  // 'legacyMemo: memo' // Alias support needs confirmation, maybe skip for now?
                  'memo'
                ] as const
              }
            ] as const
          },
        ] as const,
      }
    })
  })
})
