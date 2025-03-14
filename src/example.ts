import { SubsquidClient } from './client.js';
import { Token } from './generated/types.js';
import { ETHEREUM_URL } from './networks.js';

// Initialize the client with a valid Subsquid URL
// Replace this with an actual URL from networks.ts
const client = new SubsquidClient(ETHEREUM_URL);

async function customTokenQuery() {
  try {
    // Use the generic query method for a custom query
    const tokens = await client.query(
      'tokens',
      ['id', 'tokenType', 'tokenAddress', 'tokenSubID'],
      { tokenType_eq: 'ERC20' },
      ['tokenAddress_ASC'],
      5,
    );

    console.log(`Found ${tokens.length} ERC20 tokens:`);
    tokens.forEach((token: Token) => {
      console.log(`  ${token.tokenAddress}`);
    });
  } catch (error) {
    console.error('Error running custom query:', error);
  }
}

export { customTokenQuery };
