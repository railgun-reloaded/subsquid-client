import { describe, it } from 'node:test'

import { SubsquidClient } from '../src/client'

describe('Subsquid Client', async () => {
  const client = new SubsquidClient({ network: 'ethereum' })

  it('Should query commitments with fragments and provide discriminated type safety', async () => {
    const limit = 10
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

    // Type-level assertion: each commitment is a discriminated union over __typename
    // and narrowing exposes the implementor-specific fields.
    for (const c of commitments) {
      if (c.__typename === 'ShieldCommitment') {
        const _shieldKey: string = c.shieldKey
        const _npk: string = c.preimage.npk
        void _shieldKey; void _npk
      } else if (c.__typename === 'LegacyEncryptedCommitment') {
        const _memo: string[] = c.ciphertext.memo
        const _ephemeralKeys: string[] = c.ciphertext.ephemeralKeys
        void _memo; void _ephemeralKeys
      }
    }
  })
})
