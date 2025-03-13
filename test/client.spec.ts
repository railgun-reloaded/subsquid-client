import test from 'node:test';
import assert from 'node:assert';
import { SubsquidClient, isNetworkValid, Nullifier, Unshield, Commitment, Transaction } from '../src/client.js';
import { ETHEREUM_SEPOLIA_URL } from '../src/networks.js';

test('SubsquidClient', async (t) => {
  // Test valid initialization
  await t.test('should initialize with valid URL', () => {
    // Take the first valid URL from the list
    const validURL = ETHEREUM_SEPOLIA_URL;

    // This should not throw an error
    const client = new SubsquidClient(validURL);

    // Check that client was created successfully
    assert.ok(client instanceof SubsquidClient);
  });

  // Test for missing URL
  await t.test('should throw error when URL is not provided', () => {
    // Test with undefined
    assert.throws(
      // @ts-expect-error Testing invalid input
      () => new SubsquidClient(),
      /Invalid Subsquid URL/,
    );

    // Test with empty string
    assert.throws(() => new SubsquidClient(''), /Invalid Subsquid URL/);

    // Test with null
    assert.throws(
      // @ts-expect-error Testing invalid input
      () => new SubsquidClient(null),
      /Invalid Subsquid URL/,
    );
  });

  // Test for invalid URL
  await t.test('should throw error when URL is not a valid Subsquid URL', () => {
    // Try with a completely invalid URL
    assert.throws(() => new SubsquidClient('https://example.com'), /Invalid Subsquid URL/);

    // Try with a URL that looks similar but isn't in the valid list
    assert.throws(
      () => new SubsquidClient('https://rail-squid.squids.live/fake-endpoint/graphql'),
      /Invalid Subsquid URL/,
    );
  });

  // Test isNetworkValid function
  await t.test('isNetworkValid should correctly validate URLs', () => {
    // Valid URL should return true
    assert.strictEqual(isNetworkValid(ETHEREUM_SEPOLIA_URL), true);

    // Invalid URLs should return false
    assert.strictEqual(isNetworkValid('https://example.com'), false);
    assert.strictEqual(isNetworkValid(''), false);
  });

  // Creating a mock client for testing query methods
  const mockClient = {
    request: async () => ({
      nullifiers: [{ id: '1', blockNumber: '100', nullifier: '0x123', transactionHash: '0xabc', blockTimestamp: '1622541234', treeNumber: 1 }],
      unshields: [{ 
        id: '2', 
        blockNumber: '200', 
        to: '0xdef', 
        transactionHash: '0xbcd', 
        fee: '0.1', 
        blockTimestamp: '1622541235', 
        amount: '100', 
        eventLogIndex: '1',
        token: { id: 't1', tokenType: 'ERC20', tokenSubID: '0', tokenAddress: '0x456' }
      }],
      commitments: [{ 
        id: '3', 
        treeNumber: 1, 
        batchStartTreePosition: 0, 
        treePosition: 1, 
        blockNumber: '300', 
        transactionHash: '0xcde', 
        blockTimestamp: '1622541236', 
        commitmentType: 'ShieldCommitment', 
        hash: '0x789' 
      }],
      shieldCommitments: [{ 
        id: '4', 
        treeNumber: 2, 
        batchStartTreePosition: 0, 
        treePosition: 2, 
        blockNumber: '400', 
        transactionHash: '0xdef', 
        blockTimestamp: '1622541237', 
        commitmentType: 'ShieldCommitment', 
        hash: '0x890',
        shieldKey: '0x123',
        fee: '0.1',
        encryptedBundle: ['0xaaa', '0xbbb', '0xccc'],
        preimage: {
          id: 'p1',
          npk: '0xnpk',
          value: '200',
          token: { id: 't2', tokenType: 'ERC20', tokenSubID: '0', tokenAddress: '0x567' }
        }
      }],
      transactCommitments: [{ 
        id: '5', 
        treeNumber: 3, 
        batchStartTreePosition: 0, 
        treePosition: 3, 
        blockNumber: '500', 
        transactionHash: '0xefg', 
        blockTimestamp: '1622541238', 
        commitmentType: 'TransactCommitment', 
        hash: '0x901',
        ciphertext: {
          id: 'c1',
          ciphertext: {
            id: 'c2',
            iv: '0xiv',
            tag: '0xtag',
            data: ['0xdata1', '0xdata2']
          },
          blindedSenderViewingKey: '0xsender',
          blindedReceiverViewingKey: '0xreceiver',
          annotationData: '0xannotation',
          memo: '0xmemo'
        }
      }],
      transactions: [{ 
        id: '6', 
        blockNumber: '600', 
        transactionHash: '0xfgh', 
        blockTimestamp: '1622541239',
        merkleRoot: '0xroot',
        hasUnshield: true,
        utxoTreeIn: '1',
        utxoTreeOut: '2'
      }]
    })
  };

  // Skip these tests in CI environments where we can't mock the GraphQLClient easily
  if (process.env.CI !== 'true') {
    const client = new SubsquidClient(ETHEREUM_SEPOLIA_URL);
    // Replace the internal client with our mock
    // @ts-expect-error - Accessing private field for testing
    client.client = mockClient;

    // Test query methods with the mock client
    await t.test('should fetch nullifiers correctly', async () => {
      const nullifiers = await client.getNullifiers(0, 10);
      assert.ok(Array.isArray(nullifiers));
      assert.strictEqual(nullifiers.length, 1);
      assert.strictEqual(nullifiers[0].id, '1');
      assert.strictEqual(nullifiers[0].blockNumber, '100');
    });

    await t.test('should fetch unshields correctly', async () => {
      const unshields = await client.getUnshields(0, 10);
      assert.ok(Array.isArray(unshields));
      assert.strictEqual(unshields.length, 1);
      assert.strictEqual(unshields[0].id, '2');
      assert.strictEqual(unshields[0].blockNumber, '200');
      assert.strictEqual(unshields[0].token.tokenType, 'ERC20');
    });

    await t.test('should fetch commitments correctly', async () => {
      const commitments = await client.getCommitments(0, 10);
      assert.ok(Array.isArray(commitments));
      assert.strictEqual(commitments.length, 1);
      assert.strictEqual(commitments[0].id, '3');
      assert.strictEqual(commitments[0].commitmentType, 'ShieldCommitment');
    });

    await t.test('should fetch detailed commitments correctly', async () => {
      const commitments = await client.getDetailedCommitments(0, 10);
      assert.ok(Array.isArray(commitments));
      assert.strictEqual(commitments.length, 1);
      assert.strictEqual(commitments[0].id, '3');
    });

    await t.test('should fetch shield commitments correctly', async () => {
      const shieldCommitments = await client.getShieldCommitments(0, 10);
      assert.ok(Array.isArray(shieldCommitments));
      assert.strictEqual(shieldCommitments.length, 1);
      assert.strictEqual(shieldCommitments[0].id, '4');
      assert.strictEqual(shieldCommitments[0].shieldKey, '0x123');
      assert.strictEqual(shieldCommitments[0].preimage.token.tokenAddress, '0x567');
    });

    await t.test('should fetch transact commitments correctly', async () => {
      const transactCommitments = await client.getTransactCommitments(0, 10);
      assert.ok(Array.isArray(transactCommitments));
      assert.strictEqual(transactCommitments.length, 1);
      assert.strictEqual(transactCommitments[0].id, '5');
      assert.strictEqual(transactCommitments[0].ciphertext.blindedSenderViewingKey, '0xsender');
    });

    await t.test('should fetch transactions correctly', async () => {
      const transactions = await client.getTransactions(0, 10);
      assert.ok(Array.isArray(transactions));
      assert.strictEqual(transactions.length, 1);
      assert.strictEqual(transactions[0].id, '6');
      assert.strictEqual(transactions[0].hasUnshield, true);
    });
  }
});
