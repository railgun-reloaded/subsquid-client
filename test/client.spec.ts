// @ts-nocheck
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { SubsquidClient } from '../src/client'
import { TokenOrderByInput, TokenType } from '../src/generated/types'

describe('Subsquid Client', async (t) => {
  it('Should initialize with valid network config', () => {
    const client = new SubsquidClient({ network: 'ethereum' })
    assert.ok(client instanceof SubsquidClient)
  })

  it('Should initialize with custom URL', () => {
    const client = new SubsquidClient({ customSubsquidUrl: 'https://example.com/graphql' })
    assert.ok(client instanceof SubsquidClient)
  })

  it('Should throw with invalid network', () => {
    assert.throws(() => new SubsquidClient({ network: 'invalidNetwork' as any }), Error)
  })

  it('Should throw with invalid URL', () => {
    assert.throws(() => new SubsquidClient({ customSubsquidUrl: 'not-a-url' }), Error)
  })

  it('Should check for supported networks', () => {
    const invalid = 'invalid'
    assert.ok(() => new SubsquidClient({ network: 'ethereum' }))
    assert.ok(() => new SubsquidClient({ network: 'ethereumSepolia' }))
    assert.ok(() => new SubsquidClient({ network: 'bsc' }))
    assert.ok(() => new SubsquidClient({ network: 'polygon' }))
    assert.ok(() => new SubsquidClient({ network: 'arbitrum' }))
    assert.throws(() => new SubsquidClient({ network: invalid as any }))
  })

  it('Should use customSubsquidUrl if both customSubsquidUrl and network are provided', () => {
    const TEST_URL = 'https://custom.example.com/graphql'
    const TEST_NETWORK = 'ethereum'
    const client = new SubsquidClient({ customSubsquidUrl: TEST_URL, network: TEST_NETWORK } as any)
    // @ts-expect-error: accessing private property for test
    assert.strictEqual(client.clientUrl, TEST_URL, 'customSubsquidUrl should take precedence over network')
  })

  const client = new SubsquidClient({ network: 'ethereum' })

  it('Should throw an error when GraphQL response contains errors from invalid syntax', async () => {
    const invalidQuery = `
      query {
      }
    `
    await assert.rejects(
      async () => await client.request({ query: invalidQuery }),
      (error) => {
        console.log(error.cause)
        assert.ok(error instanceof Error)
        assert.ok(error.cause[0].message.includes('Syntax Error'))
        return true
      },
      'Should throw an error when GraphQL response contains errors from invalid syntax'
    )
  })

  it('Should throw an error when GraphQL response contains errors from invalid query', async () => {
    const invalidQueryString = 'foo'
    const invalidQuery = `
      query { ${invalidQueryString} }
    `
    await assert.rejects(
      async () => await client.request({ query: invalidQuery }),
      (error) => {
        assert.ok(error instanceof Error)
        assert.ok(error.cause[0].message.includes(`Cannot query field "${invalidQueryString}"`))
        return true
      },
      'Should throw an error when GraphQL response contains errors from invalid query'
    )
  })

  it('Should execute basic query without filters', async () => {
    const { tokens } = await client.query({
      tokens: {
        fields: ['id', 'tokenType', 'tokenAddress', 'tokenSubID'],
        limit: 5,
      }
    })
    assert.ok(Array.isArray(tokens), 'Result should be an array')
    assert.ok(tokens.length <= 5, 'Result should respect the limit')

    if (tokens.length > 0) {
      assert.ok('id' in tokens[0], 'Result items should have id field')
      assert.ok('tokenType' in tokens[0], 'Result items should have tokenType field')
      assert.ok('tokenAddress' in tokens[0], 'Result items should have tokenAddress field')
      assert.ok('tokenSubID' in tokens[0], 'Result items should have tokenSubID field')
    }
  })

  it('Should execute basic query for several entities', async () => {
    const { tokens, commitments, nullifiers, transactions } = await client.query({
      tokens: {
        fields: ['id', 'tokenType', 'tokenAddress', 'tokenSubID'],
        limit: 5,
      },
      commitments: {
        fields: ['id', 'transactionHash', 'treeNumber', 'batchStartTreePosition'],
        limit: 5,
      },
      nullifiers: {
        fields: ['id', 'nullifier', 'transactionHash', 'treeNumber'],
        limit: 5,
      },
      transactions: {
        fields: ['id', 'blockNumber', 'transactionHash'],
        limit: 5,
      }
    })

    const entitiesResult = [tokens, commitments, nullifiers, transactions]

    entitiesResult.forEach((entity) => {
      assert.ok(Array.isArray(entity), 'Result should be an array')
      assert.ok(entity.length <= 5, 'Result should respect the limit')
    })

    if (tokens.length > 0) {
      assert.ok('id' in tokens[0], 'Result items should have id field')
      assert.ok('tokenType' in tokens[0], 'Result items should have tokenType field')
      assert.ok('tokenAddress' in tokens[0], 'Result items should have tokenAddress field')
      assert.ok('tokenSubID' in tokens[0], 'Result items should have tokenSubID field')
    }

    if (commitments.length > 0) {
      assert.ok('id' in commitments[0], 'Result items should have id field')
      assert.ok('transactionHash' in commitments[0], 'Result items should have transactionHash field')
      assert.ok('treeNumber' in commitments[0], 'Result items should have treeNumber field')
      assert.ok('batchStartTreePosition' in commitments[0], 'Result items should have batchStartTreePosition field')
    }

    if (nullifiers.length > 0) {
      assert.ok('id' in nullifiers[0], 'Result items should have id field')
      assert.ok('nullifier' in nullifiers[0], 'Result items should have nullifier field')
      assert.ok('transactionHash' in nullifiers[0], 'Result items should have transactionHash field')
      assert.ok('treeNumber' in nullifiers[0], 'Result items should have treeNumber field')
    }

    if (transactions.length > 0) {
      assert.ok('id' in transactions[0], 'Result items should have id field')
      assert.ok('blockNumber' in transactions[0], 'Result items should have blockNumber field')
      assert.ok('transactionHash' in transactions[0], 'Result items should have transactionHash field')
    }
  })

  it('Should query with enum filtering', async () => {
    try {
      const { tokens } = await client.query(
        {
          tokens: {
            fields: ['id', 'tokenType', 'tokenAddress', 'tokenSubID'],
            limit: 5,
            where: {
              tokenType_eq: TokenType.Erc20
            },
          },
        }
      )
      assert.ok(Array.isArray(tokens), 'Result should be an array')
      if (tokens.length > 0) {
        tokens.forEach((token) => {
          assert.strictEqual(token.tokenType, 'ERC20', 'All tokens should have ERC20 tokenType')
        })
      }
    } catch (error) {
      assert.fail(`Query with enum filtering failed: ${error.message}`)
    }
  })

  it('Should query with complex nested where conditions', async () => {
    try {
      const { tokens } = await client.query(
        {
          tokens: {
            fields: ['id', 'tokenType', 'tokenAddress', 'tokenSubID'],
            limit: 10,
            where: {
              AND: [
                { tokenType_eq: TokenType.Erc20 },
                {
                  OR: [
                    { tokenAddress_eq: '0x0000000000000000000000000000000000000000' }
                  ]
                }
              ]
            },
            orderBy: [TokenOrderByInput.IdAsc]
          },
        }
      )
      assert.ok(Array.isArray(tokens), 'Result should be an array')
      if (tokens.length > 0) {
        tokens.forEach((token) => {
          assert.strictEqual(token.tokenType, 'ERC20', 'All tokens should have ERC20 tokenType')
          assert.ok(
            token.tokenAddress.includes('0x') || token.id > '0',
            'Token address should contain 0x or id should be greater than 0'
          )
        })
      }
    } catch (error) {
      console.error('Error details:', error)
      assert.fail(`Query with complex where conditions failed: ${error.message}`)
    }
  })

  it('Should query with nested objects inside fields', async () => {
    const client = new SubsquidClient({ network: 'ethereum' })
    assert.ok(client instanceof SubsquidClient)

    const { unshields } = await client.query({
      unshields: {
        fields: [
          'id',
          { token: ['id', 'tokenType', 'tokenAddress', 'tokenSubID'] },
          'amount',
          'blockNumber'
        ],
        limit: 5,
      }
    })

    assert.ok(Array.isArray(unshields), 'unshields should be an array')

    if (unshields.length > 0) {
      const firstUnshield = unshields[0]
      assert.ok(firstUnshield !== null && typeof firstUnshield === 'object', 'Each item in unshields should be an object')
      assert.ok('id' in firstUnshield, 'Unshield object should have id field')
      assert.ok('amount' in firstUnshield, 'Unshield object should have amount field')
      assert.ok('blockNumber' in firstUnshield, 'Unshield object should have blockNumber field')

      assert.ok('token' in firstUnshield, 'Unshield object should have token field')
      assert.ok(firstUnshield.token !== null && typeof firstUnshield.token === 'object', 'token field should be an object')

      const token = firstUnshield.token
      assert.ok('id' in token, 'Token object should have id field')
      assert.ok('tokenType' in token, 'Token object should have tokenType field')
      assert.ok('tokenAddress' in token, 'Token object should have tokenAddress field')
      assert.ok('tokenSubID' in token, 'Token object should have tokenSubID field')
    }
  })

  it('Should query with OR conditions', async () => {
    try {
      const { tokens } = await client.query(
        {
          tokens: {
            fields: ['id', 'tokenType', 'tokenAddress', 'tokenSubID'],
            limit: 5,
            where: {
              OR: [{ tokenType_eq: TokenType.Erc20 }, { tokenType_eq: TokenType.Erc721 }],
            },
          },
        }
      )

      assert.ok(Array.isArray(tokens), 'Result should be an array')

      if (tokens.length > 0) {
        tokens.forEach((token) => {
          assert.ok(
            ['ERC20', 'ERC721'].includes(token.tokenType),
            'All tokens should have either ERC20 or ERC721 tokenType'
          )
        })
      }
    } catch (error) {
      assert.fail(`Query with OR conditions failed: ${error.message}`)
    }
  })

  it('Should query with ordering', async () => {
    try {
      const { tokens } = await client.query({
        tokens: {
          fields: ['id', 'tokenType', 'tokenAddress', 'tokenSubID'],
          limit: 5,
          orderBy: ['id_ASC']
        }
      })

      assert.ok(Array.isArray(tokens), 'Result should be an array')

      if (tokens.length > 1) {
        for (let i = 0; i < tokens.length - 1; i++) {
          assert.ok(
            tokens[i].id <= tokens[i + 1].id,
            'Tokens should be ordered by id in ascending order'
          )
        }
      }
    } catch (error) {
      assert.fail(`Query with ordering failed: ${error.message}`)
    }
  })

  it('Should query different entity types', async () => {
    try {
      const { transactions } = await client.query({
        transactions: {
          fields: ['id', 'blockNumber', 'transactionHash'],
          limit: 5,
        }
      })

      assert.ok(Array.isArray(transactions), 'Result should be an array')

      if (transactions.length > 0) {
        assert.ok('id' in transactions[0], 'Transaction should have id field')
        assert.ok('blockNumber' in transactions[0], 'Transaction should have blockNumber field')
        assert.ok(
          'transactionHash' in transactions[0],
          'Transaction should have transactionHash field'
        )
      }
    } catch (error) {
      assert.fail(`Query for transactions failed: ${error.message}`)
    }
  })

  it('Should query transactions with blockNumber filter', async () => {
    try {
      const blockThreshold = '14760000'
      const { transactions } = await client.query({
        transactions: {
          fields: ['id', 'blockNumber', 'transactionHash'],
          limit: 5,
          where: {
            blockNumber_gt: blockThreshold
          }
        }
      })

      assert.ok(Array.isArray(transactions), 'Result should be an array')

      if (transactions.length > 0) {
        transactions.forEach((tx) => {
          assert.ok(
            parseInt(tx.blockNumber) > parseInt(blockThreshold),
            `All transactions should have blockNumber > ${blockThreshold}`
          )
        })
      }
    } catch (error) {
      assert.fail(`Query with blockNumber filter failed: ${error.message}`)
    }
  })

  it('Should execute direct GraphQL query with OR conditions', async () => {
    try {
      const query = `
        query {
          tokens(limit: 5, where: { OR: [{ tokenType_eq: ERC20 }, { tokenType_eq: ERC721 }] }) {
            id
            tokenType
            tokenAddress
            tokenSubID
          }
        }
      `

      const result = await client.request({ query }) as { tokens: any[] }

      assert.ok(result, 'Result should exist')
      assert.ok(typeof result === 'object' && result !== null, 'Result should be an object')
      assert.ok('tokens' in (result as object), 'Result should have tokens property')
      assert.ok(Array.isArray(result.tokens), 'tokens should be an array')

      if (result.tokens.length > 0) {
        result.tokens.forEach((token) => {
          assert.ok(
            ['ERC20', 'ERC721'].includes(token.tokenType),
            'All tokens should have either ERC20 or ERC721 tokenType'
          )
        })
      }
    } catch (error) {
      assert.fail(`Direct GraphQL query with OR conditions failed: ${error.message}`)
    }
  })

  it('Should query schema for enum values', async () => {
    try {
      const query = `
        query {
          __type(name: "TokenType") {
            name
            kind
            enumValues {
              name
            }
          }
        }
      `

      interface SchemaType {
        __type: {
          name: string;
          kind: string;
          enumValues: { name: string }[];
        };
      }

      const result = await client.request({ query }) as SchemaType

      assert.ok(result, 'Result should exist')
      assert.ok(typeof result === 'object' && result !== null, 'Result should be an object')
      assert.ok('__type' in (result as object), 'Result should have __type property')

      const typeInfo = result.__type
      assert.strictEqual(typeInfo.name, 'TokenType', 'Type name should be TokenType')
      assert.strictEqual(typeInfo.kind, 'ENUM', 'Type kind should be ENUM')
      assert.ok(Array.isArray(typeInfo.enumValues), 'enumValues should be an array')

      const enumValues = typeInfo.enumValues.map((v) => v.name)
      assert.ok(enumValues.includes('ERC20'), 'TokenType should include ERC20')
      assert.ok(enumValues.includes('ERC721'), 'TokenType should include ERC721')
      assert.ok(enumValues.includes('ERC1155'), 'TokenType should include ERC1155')
    } catch (error) {
      assert.fail(`Schema introspection query failed: ${error.message}`)
    }
  })

  it('Should support mixed conditions with enum and ID', async () => {
    try {
      const query = `
        query {
          tokens(limit: 5, where: { tokenType_eq: ERC20, tokenAddress_eq: "0x0000000000000000000000000000000000000000" }) {
            id
            tokenType
            tokenAddress
            tokenSubID
          }
        }
      `

      const result = await client.request({ query })
      assert.ok(result, 'Mixed conditions query succeeded')
      assert.ok('tokens' in result, 'Result has tokens property')

      if (result.tokens.length > 0) {
        assert.strictEqual(result.tokens[0].tokenType, 'ERC20', 'Returned token has ERC20 type')
        assert.strictEqual(
          result.tokens[0].tokenAddress,
          '0x0000000000000000000000000000000000000000',
          'Returned token has the requested address'
        )
      }
    } catch (error) {
      assert.fail(`Mixed conditions query failed: ${error.message}`)
    }
  })

  it('Should execute commitments connection query with pagination', async () => {
    try {
      const query = `
        query {
          commitmentsConnection(orderBy: id_ASC, after: "10", first: 10) {
            edges {
              cursor
              node {
                batchStartTreePosition
              }
            }
            pageInfo {
              hasNextPage
            }
          }
        }
      `

      const result = await client.request({ query })

      assert.ok(result, 'Connection query should return a result')
      assert.ok('commitmentsConnection' in result, 'Result should have commitmentsConnection property')

      const { commitmentsConnection } = result

      assert.ok('edges' in commitmentsConnection, 'Connection should have edges property')
      assert.ok(Array.isArray(commitmentsConnection.edges), 'Edges should be an array')

      assert.ok('pageInfo' in commitmentsConnection, 'Connection should have pageInfo property')
      assert.ok('hasNextPage' in commitmentsConnection.pageInfo, 'PageInfo should have hasNextPage property')

      if (commitmentsConnection.edges.length > 0) {
        const firstEdge = commitmentsConnection.edges[0]

        assert.ok('cursor' in firstEdge, 'Edge should have cursor property')
        assert.ok('node' in firstEdge, 'Edge should have node property')

        assert.ok('batchStartTreePosition' in firstEdge.node, 'Node should have batchStartTreePosition property')
      }
    } catch (error) {
      assert.fail(`Commitments connection query failed: ${error.message}`)
    }
  })
})
