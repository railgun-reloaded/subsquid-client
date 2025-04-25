import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { SubsquidClient } from '../src/client'
import { queryBuilder } from '../src/query-builder'

describe('nested query scenario', async () => {
  it('should do a correct query for nested entities inside fields', async () => {
    // This test will fail until the type issue is fixed
    try {
      const client = new SubsquidClient({ network: 'ethereum' })
      assert.ok(client instanceof SubsquidClient)

      const result = await client.query({
        unshields: {
          fields: [
            'id',
            { token: ['id', 'tokenType', 'tokenAddress', 'tokenSubID'] },
            'amount',
            'blockNumber'
          ],
          limit: 5,
        },
      })

      // If we get here, the query was successful
      assert.ok(result.unshields, 'Result should contain unshields')

      if (result.unshields && result.unshields.length > 0) {
        const firstUnshield = result.unshields[0]
        assert.ok('id' in firstUnshield, 'Unshield should have id field')
        assert.ok('token' in firstUnshield, 'Unshield should have token field')
        assert.ok('amount' in firstUnshield, 'Unshield should have amount field')
        assert.ok('blockNumber' in firstUnshield, 'Unshield should have blockNumber field')

        if (firstUnshield.token) {
          assert.ok('id' in firstUnshield.token, 'Token should have id field')
          assert.ok('tokenType' in firstUnshield.token, 'Token should have tokenType field')
          assert.ok('tokenAddress' in firstUnshield.token, 'Token should have tokenAddress field')
          assert.ok('tokenSubID' in firstUnshield.token, 'Token should have tokenSubID field')
        }
      }
    } catch (error) {
      // This will fail currently due to the type error
      console.error('Error in nested query test:', error)
      throw error
    }
  })

  it('should do a correct query for more than one nested field inside a query', async () => {
    const client = new SubsquidClient({ network: 'ethereum' })
    assert.ok(client instanceof SubsquidClient)

    const result = await client.query({
      unshields: {
        fields: [
          'id',
          { token: ['id', 'tokenType', 'tokenAddress', 'tokenSubID'] },
          { transactions: ['id', 'transactionHash'] },
          'amount',
          'blockNumber'
        ],
        limit: 5,
      }
    })
  })

})
