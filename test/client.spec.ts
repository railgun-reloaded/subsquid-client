import test from 'node:test';
import assert from 'node:assert';
import { SubsquidClient, isNetworkValid } from '../src/client.js';
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
});
