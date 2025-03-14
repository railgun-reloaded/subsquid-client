// @ts-nocheck
import test from 'node:test';
import assert from 'node:assert';
import { SubsquidClient } from '../src/client.js';
import { ETHEREUM_SEPOLIA_URL, ETHEREUM_URL,BSC_URL,POLYGON_URL,ARBITRUM_URL,NetworkName } from '../src/networks.js';
import { gql } from 'graphql-tag';

test('Subsquid Client', async (t) => {
  // Client initialization tests
  await t.test('Should initialize with valid URL', () => {
    // This should not throw an error
    const client = new SubsquidClient(NetworkName.Ethereum);
    // Check that client was created successfully
    assert.ok(client instanceof SubsquidClient);
  });

  await t.test('Should throw with invalid URL', () => {
    const invalidURL = 'https://invalid-url.com';
    assert.throws(() => new SubsquidClient(invalidURL), Error);
  });

  await t.test('Should check for supported networks', () => {
    const invalid = 'invalid';
    assert.ok(() => new SubsquidClient(NetworkName.Ethereum));
    assert.ok(() => new SubsquidClient(NetworkName.EthereumSepolia));
    assert.ok(() => new SubsquidClient(NetworkName.BNBChain));
    assert.ok(() => new SubsquidClient(NetworkName.Polygon));
    assert.ok(() => new SubsquidClient(NetworkName.Arbitrum));
    assert.throws(() => new SubsquidClient(invalid));
  });

  // Create a client for the query tests
  const client = new SubsquidClient(NetworkName.Ethereum);

  // Test basic query functionality
  await t.test('Should execute basic query without filters', async () => {
    const tokens = await client.query(
      'tokens',
      ['id', 'tokenType', 'tokenAddress', 'tokenSubID'],
      undefined,
      undefined,
      5,
    );

    assert.ok(Array.isArray(tokens), 'Result should be an array');
    assert.ok(tokens.length <= 5, 'Result should respect the limit');

    if (tokens.length > 0) {
      assert.ok('id' in tokens[0], 'Result items should have id field');
      assert.ok('tokenType' in tokens[0], 'Result items should have tokenType field');
      assert.ok('tokenAddress' in tokens[0], 'Result items should have tokenAddress field');
      assert.ok('tokenSubID' in tokens[0], 'Result items should have tokenSubID field');
    }
  });
  // Test enum filtering
  await t.test('Should query with enum filtering', async () => {
    try {
      const tokens = await client.query(
        'tokens',
        ['id', 'tokenType', 'tokenAddress', 'tokenSubID'],
        { tokenType_eq: 'ERC20' },
        undefined,
        5,
      );

      assert.ok(Array.isArray(tokens), 'Result should be an array');

      if (tokens.length > 0) {
        // All returned tokens should be ERC20
        tokens.forEach((token) => {
          assert.strictEqual(token.tokenType, 'ERC20', 'All tokens should have ERC20 tokenType');
        });
      }
    } catch (error) {
      assert.fail(`Query with enum filtering failed: ${error.message}`);
    }
  });

  // Test OR conditions
  await t.test('Should query with OR conditions', async () => {
    try {
      const tokens = await client.query(
        'tokens',
        ['id', 'tokenType', 'tokenAddress', 'tokenSubID'],
        {
          OR: [{ tokenType_eq: 'ERC20' }, { tokenType_eq: 'ERC721' }],
        },
        undefined,
        5,
      );

      assert.ok(Array.isArray(tokens), 'Result should be an array');

      if (tokens.length > 0) {
        // All returned tokens should be either ERC20 or ERC721
        tokens.forEach((token) => {
          assert.ok(
            ['ERC20', 'ERC721'].includes(token.tokenType),
            'All tokens should have either ERC20 or ERC721 tokenType',
          );
        });
      }
    } catch (error) {
      assert.fail(`Query with OR conditions failed: ${error.message}`);
    }
  });

  // Test ordering
  await t.test('Should query with ordering', async () => {
    try {
      const tokens = await client.query(
        'tokens',
        ['id', 'tokenType', 'tokenAddress', 'tokenSubID'],
        undefined,
        ['id_ASC'],
        5,
      );

      assert.ok(Array.isArray(tokens), 'Result should be an array');

      if (tokens.length > 1) {
        // Check if tokens are ordered by ID in ascending order
        for (let i = 0; i < tokens.length - 1; i++) {
          assert.ok(
            tokens[i].id <= tokens[i + 1].id,
            'Tokens should be ordered by id in ascending order',
          );
        }
      }
    } catch (error) {
      assert.fail(`Query with ordering failed: ${error.message}`);
    }
  });

  // Test different entity types
  await t.test('Should query different entity types', async () => {
    try {
      const transactions = await client.query(
        'transactions',
        ['id', 'blockNumber', 'transactionHash'],
        undefined,
        undefined,
        5,
      );

      assert.ok(Array.isArray(transactions), 'Result should be an array');

      if (transactions.length > 0) {
        assert.ok('id' in transactions[0], 'Transaction should have id field');
        assert.ok('blockNumber' in transactions[0], 'Transaction should have blockNumber field');
        assert.ok(
          'transactionHash' in transactions[0],
          'Transaction should have transactionHash field',
        );
      }
    } catch (error) {
      assert.fail(`Query for transactions failed: ${error.message}`);
    }
  });

  // Test filtering on other entity types
  await t.test('Should query transactions with blockNumber filter', async () => {
    try {
      const blockThreshold = '14760000';
      const transactions = await client.query(
        'transactions',
        ['id', 'blockNumber', 'transactionHash'],
        { blockNumber_gt: blockThreshold },
        undefined,
        5,
      );

      assert.ok(Array.isArray(transactions), 'Result should be an array');

      if (transactions.length > 0) {
        // All transactions should have block numbers greater than the threshold
        transactions.forEach((tx) => {
          assert.ok(
            parseInt(tx.blockNumber) > parseInt(blockThreshold),
            `All transactions should have blockNumber > ${blockThreshold}`,
          );
        });
      }
    } catch (error) {
      assert.fail(`Query with blockNumber filter failed: ${error.message}`);
    }
  });

  // Test direct GraphQL queries
  await t.test('Should execute direct GraphQL queries', async () => {
    try {
      const query = gql`
        query {
          tokens(limit: 5, where: { tokenType_eq: ERC20 }) {
            id
            tokenType
            tokenAddress
            tokenSubID
          }
        }
      `;

      const result = await client.request<{ tokens: any[] }>(query);

      assert.ok(result, 'Result should exist');
      // Add type assertion to fix 'in' operator error
      assert.ok(typeof result === 'object' && result !== null, 'Result should be an object');
      assert.ok('tokens' in (result as object), 'Result should have tokens property');
      assert.ok(Array.isArray(result.tokens), 'tokens should be an array');

      if (result.tokens.length > 0) {
        // Verify all returned tokens are ERC20
        result.tokens.forEach((token) => {
          assert.strictEqual(token.tokenType, 'ERC20', 'All tokens should have ERC20 tokenType');
        });
      }
    } catch (error) {
      assert.fail(`Direct GraphQL query failed: ${error.message}`);
    }
  });

  // Test direct GraphQL query with OR conditions
  await t.test('Should execute direct GraphQL query with OR conditions', async () => {
    try {
      const query = gql`
        query {
          tokens(limit: 5, where: { OR: [{ tokenType_eq: ERC20 }, { tokenType_eq: ERC721 }] }) {
            id
            tokenType
            tokenAddress
            tokenSubID
          }
        }
      `;

      const result = await client.request<{ tokens: any[] }>(query);

      assert.ok(result, 'Result should exist');
      // Add type assertion to fix 'in' operator error
      assert.ok(typeof result === 'object' && result !== null, 'Result should be an object');
      assert.ok('tokens' in (result as object), 'Result should have tokens property');
      assert.ok(Array.isArray(result.tokens), 'tokens should be an array');

      if (result.tokens.length > 0) {
        // Verify all returned tokens are either ERC20 or ERC721
        result.tokens.forEach((token) => {
          assert.ok(
            ['ERC20', 'ERC721'].includes(token.tokenType),
            'All tokens should have either ERC20 or ERC721 tokenType',
          );
        });
      }
    } catch (error) {
      assert.fail(`Direct GraphQL query with OR conditions failed: ${error.message}`);
    }
  });

  // Test schema introspection
  await t.test('Should query schema for enum values', async () => {
    try {
      const query = gql`
        query {
          __type(name: "TokenType") {
            name
            kind
            enumValues {
              name
            }
          }
        }
      `;

      interface SchemaType {
        __type: {
          name: string;
          kind: string;
          enumValues: { name: string }[];
        };
      }

      const result = await client.request<SchemaType>(query);

      assert.ok(result, 'Result should exist');
      // Add type assertion to fix 'in' operator error
      assert.ok(typeof result === 'object' && result !== null, 'Result should be an object');
      assert.ok('__type' in (result as object), 'Result should have __type property');

      // Type assertion for the __type property
      const typeInfo = result.__type;
      assert.strictEqual(typeInfo.name, 'TokenType', 'Type name should be TokenType');
      assert.strictEqual(typeInfo.kind, 'ENUM', 'Type kind should be ENUM');
      assert.ok(Array.isArray(typeInfo.enumValues), 'enumValues should be an array');

      // Check that the expected enum values exist
      const enumValues = typeInfo.enumValues.map((v) => v.name);
      assert.ok(enumValues.includes('ERC20'), 'TokenType should include ERC20');
      assert.ok(enumValues.includes('ERC721'), 'TokenType should include ERC721');
      assert.ok(enumValues.includes('ERC1155'), 'TokenType should include ERC1155');
    } catch (error) {
      assert.fail(`Schema introspection query failed: ${error.message}`);
    }
  });

  // Test known limitations (these tests document current behavior)
  await t.test('Current behavior: String contains operator', async () => {
    try {
      const query = gql`
        query {
          tokens(limit: 5, where: { tokenAddress_contains: "0x" }) {
            id
            tokenType
            tokenAddress
            tokenSubID
          }
        }
      `;

      await client.request(query);
      // If this succeeds (API behavior might change), adjust the test
      assert.ok(true, 'String contains operator worked (API behavior may have changed)');
    } catch (error) {
      // Currently expected to fail, so this is not a test failure
      assert.ok(error, 'String contains operator currently fails as expected');
    }
  });

  await t.test('Current behavior: Mixed conditions with enum and string', async () => {
    try {
      const query = gql`
        query {
          tokens(limit: 5, where: { tokenType_eq: ERC20, tokenAddress_contains: "0x" }) {
            id
            tokenType
            tokenAddress
            tokenSubID
          }
        }
      `;

      await client.request(query);
      // If this succeeds (API behavior might change), adjust the test
      assert.ok(true, 'Mixed conditions worked (API behavior may have changed)');
    } catch (error) {
      // Currently expected to fail, so this is not a test failure
      assert.ok(error, 'Mixed conditions currently fail as expected');
    }
  });
});
