# `@railgun-reloaded/subsquid-client`

> TypeScript client for interacting with Railgun Subsquid GraphQL APIs with enhanced type safety and filtering capabilities.

## Install

```bash
npm install @railgun-community/subsquid-client
```

## Example Usage

## Supported Networks

The SubsquidClient supports a predefined set of networks. To see the list of supported networks, use the SUPPORTED_NETWORKS static property:

```typescript
import { SubsquidClient } from '@railgun-community/subsquid-client';

console.log(SubsquidClient.SUPPORTED_NETWORKS);
// example output: ['ethereum', 'ethereumSepolia', 'bnbChain', 'polygon', 'arbitrum']
```

When initializing the client, provide one of these network names as a string. If an unsupported network is provided, an error will be thrown with the list of valid options.

### Basic Usage

```typescript
import { SubsquidClient } from './client';

// Initialize the client with a valid Subsquid Network
const client = new SubsquidClient('ethereum');

// Simple query for tokens with type-safety
const tokens = await client.query(
  'tokens',
  ['id', 'tokenType', 'tokenAddress', 'tokenSubID'],
  undefined,
  undefined,
  5 // limit
);
console.log(tokens);
```

### Filtering with Enum Values

```typescript
// Filter tokens by ERC20 type
const erc20Tokens = await client.query(
  'tokens',
  ['id', 'tokenType', 'tokenAddress', 'tokenSubID'],
  { tokenType_eq: 'ERC20' },
  undefined,
  5
);
console.log(erc20Tokens);
```

### Using OR Conditions

```typescript
// Find tokens that are either ERC20 or ERC721
const mixedTokens = await client.query(
  'tokens',
  ['id', 'tokenType', 'tokenAddress', 'tokenSubID'],
  {
    OR: [
      { tokenType_eq: 'ERC20' },
      { tokenType_eq: 'ERC721' }
    ]
  },
  undefined,
  5
);
console.log(mixedTokens);
```

### Ordering Results

```typescript
// Order tokens by ID ascending
const orderedTokens = await client.query(
  'tokens',
  ['id', 'tokenType', 'tokenAddress', 'tokenSubID'],
  undefined,
  ['id_ASC'],
  5
);
console.log(orderedTokens);
```

### Filtering Other Entity Types

```typescript
// Filter transactions by block number
const recentTransactions = await client.query(
  'transactions',
  ['id', 'blockNumber', 'transactionHash'],
  { blockNumber_gt: '14760000' },
  undefined,
  5
);
console.log(recentTransactions);
```

### Direct GraphQL Queries

```typescript
import { gql } from 'graphql-tag';

// For more complex queries, you can use direct GraphQL
const query = gql`
  query {
    tokens(
      limit: 5, 
      where: { 
        OR: [
          {tokenType_eq: ERC20}, 
          {tokenType_eq: ERC721}
        ]
      }
    ) {
      id
      tokenType
      tokenAddress
      tokenSubID
    }
  }
`;

const result = await client.request(query);
console.log(result);
```

## License

MIT
