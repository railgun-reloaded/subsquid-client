import { SubsquidClient } from './client.js';
import { ETHEREUM_URL } from './networks.js';

// Initialize the client with a valid Subsquid URL
const client = new SubsquidClient(ETHEREUM_URL);

// Custom query testing different variations
async function testTokenQueryVariations() {
  console.log('===== TESTING TOKEN QUERY VARIATIONS =====');

  try {
    // Try using the query builder
    const tokens = await client.query(
      'tokens',
      ['id', 'tokenType', 'tokenAddress', 'tokenSubID'],
      undefined,
      undefined,
      5,
    );
    console.log('tokens; ', tokens);

  } catch (error) {
    console.error('Error in test variations:', error);
  }
}

// Run the tests
async function runTests() {
  console.log('\n===== RUNNING TOKEN QUERY =====');
  await testTokenQueryVariations();
}

runTests().catch(console.error);

export { testTokenQueryVariations };
