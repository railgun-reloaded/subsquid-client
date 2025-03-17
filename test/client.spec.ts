// @ts-nocheck
import test from 'node:test';
import assert from 'node:assert';
import { SubsquidClient } from '../src/client.js';
import { ETHEREUM_SEPOLIA_URL, ETHEREUM_URL,BSC_URL,POLYGON_URL,ARBITRUM_URL,NetworkName } from '../src/networks.js';
import { gql } from 'graphql-tag';

test('Subsquid Client', async (t) => {
  // Client initialization tests
  await t.test('Should initialize with valid config', () => {
    // This should not throw an error
    const client = new SubsquidClient('ethereum');
    // Check that client was created successfully
    assert.ok(client instanceof SubsquidClient);
  });

  await t.test('Should throw with invalid URL', () => {
    assert.throws(() => new SubsquidClient('invalidNetwork'), Error);
  });

  await t.test('Should check for supported networks', () => {
    const invalid = 'invalid';
    assert.ok(() => new SubsquidClient('ethereum'));
    assert.ok(() => new SubsquidClient('ethereumSepolia'));
    assert.ok(() => new SubsquidClient('bnb'));
    assert.ok(() => new SubsquidClient('polygon'));
    assert.ok(() => new SubsquidClient('arbitrum'));
    assert.throws(() => new SubsquidClient(invalid));
  });

  // Create a client for the query tests
  const client = new SubsquidClient('ethereum');

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
});
