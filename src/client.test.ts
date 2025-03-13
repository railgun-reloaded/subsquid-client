import { SubsquidClient, isValidSubsquidURL } from './client.js';
import { VALID_SUBSQUID_URLS } from './networks.js';

describe('SubsquidClient', () => {
  // Test valid initialization
  test('should initialize with valid URL', () => {
    // Take the first valid URL from the list
    const validURL = VALID_SUBSQUID_URLS[0];

    // This should not throw an error
    const client = new SubsquidClient(validURL);

    // Check that client was created successfully
    expect(client).toBeInstanceOf(SubsquidClient);
  });

  // Test for missing URL
  test('should throw error when URL is not provided', () => {
    // @ts-expect-error Testing invalid input
    expect(() => new SubsquidClient()).toThrow('Invalid Subsquid URL');

    // Test with empty string
    expect(() => new SubsquidClient('')).toThrow('Invalid Subsquid URL');

    // Test with null
    // @ts-expect-error Testing invalid input
    expect(() => new SubsquidClient(null)).toThrow('Invalid Subsquid URL');
  });

  // Test for invalid URL
  test('should throw error when URL is not a valid Subsquid URL', () => {
    // Try with a completely invalid URL
    expect(() => new SubsquidClient('https://example.com')).toThrow('Invalid Subsquid URL');

    // Try with a URL that looks similar but isn't in the valid list
    expect(
      () => new SubsquidClient('https://rail-squid.squids.live/fake-endpoint/graphql'),
    ).toThrow('Invalid Subsquid URL');
  });

  // Test isValidSubsquidURL function
  test('isValidSubsquidURL should correctly validate URLs', () => {
    // Valid URL should return true
    expect(isValidSubsquidURL(VALID_SUBSQUID_URLS[0])).toBe(true);

    // Invalid URLs should return false
    expect(isValidSubsquidURL('https://example.com')).toBe(false);
    expect(isValidSubsquidURL('')).toBe(false);
  });
});
