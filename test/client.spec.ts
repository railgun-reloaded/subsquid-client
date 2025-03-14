import test from 'node:test';
import assert from 'node:assert';
import { SubsquidClient } from '../src/client.js';
import { ETHEREUM_SEPOLIA_URL } from '../src/networks.js';

test('Subsquid Client', async (t) => {
  await t.test('Should initialize with valid URL', () => {
    // Take the first valid URL from the list
    const validURL = ETHEREUM_SEPOLIA_URL;
    // This should not throw an error
    const client = new SubsquidClient(validURL);
    // Check that client was created successfully
    assert.ok(client instanceof SubsquidClient);
  });

  await t.test('Should throw with invalid URL', () => {
    const invalidURL = 'https://invalid-url.com';
    assert.throws(() => new SubsquidClient(invalidURL), Error);
  });
});