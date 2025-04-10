# `@railgun-reloaded/subsquid-client`

> Typescript client for interacting with Railgun Subsquid GraphQL APIs with enhanced type safety and filtering capabilities.

## Install

```sh
npm install @railgun-reloaded/subsquid-client
```

## Example Usage

### Supported Networks

The SubsquidClient supports a predefined set of networks. To see the list of supported networks, use the SUPPORTED_NETWORKS export:

```ts
import { SUPPORTED_NETWORKS } from '@railgun-reloaded/subsquid-client';

console.log(SUPPORTED_NETWORKS);
// example output: ['ethereum', 'ethereumSepolia', 'bsc', 'polygon', 'arbitrum']
```

When initializing the client, you can either use a predefined network or provide a custom Subsquid URL.

### Basic Usage

```ts
import { SubsquidClient, TokenType } from '@railgun-reloaded/subsquid-client';

// Initialize the client with a predefined network
const client = new SubsquidClient({ network: 'ethereum' });

// Or initialize with a custom Subsquid URL
const customClient = new SubsquidClient({ customSubsquidUrl: 'https://my-subsquid-api.example.com/graphql' });

// Simple query for tokens with type-safety
const { tokens } = await client.query({
  tokens: {
    fields: ['id', 'tokenType', 'tokenAddress', 'tokenSubID'],
    limit: 5
  }
});
```

### Querying Multiple Entities

```ts
// Query multiple entity types in a single request
const { tokens, commitments, nullifiers } = await client.query({
  tokens: {
    fields: ['id', 'tokenType', 'tokenAddress', 'tokenSubID'],
    limit: 5
  },
  commitments: {
    fields: ['id', 'transactionHash', 'treeNumber', 'batchStartTreePosition'],
    limit: 5
  },
  nullifiers: {
    fields: ['id', 'nullifier', 'transactionHash', 'treeNumber'],
    limit: 5
  }
});
```

### Filtering with Enum Values

```ts
// Filter tokens by ERC20 type
const { tokens } = await client.query({
  tokens: {
    fields: ['id', 'tokenType', 'tokenAddress', 'tokenSubID'],
    limit: 5,
    where: {
      tokenType_eq: TokenType.Erc20
    }
  }
});
```

### Using OR Conditions

```ts
// Find tokens that are either ERC20 or ERC721
const { tokens } = await client.query({
  tokens: {
    fields: ['id', 'tokenType', 'tokenAddress', 'tokenSubID'],
    limit: 5,
    where: {
      OR: [{ tokenType_eq: TokenType.Erc20 }, { tokenType_eq: TokenType.Erc721 }]
    }
  }
});
```

### Complex Nested Conditions

```ts
// Complex nested where conditions
const { tokens } = await client.query({
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
    orderBy: ['id_ASC']
  }
});
```

### Ordering Results

```ts
// Order tokens by ID ascending
const { tokens } = await client.query({
  tokens: {
    fields: ['id', 'tokenType', 'tokenAddress', 'tokenSubID'],
    limit: 5,
    orderBy: ['id_ASC']
  }
});
```

### Filtering Other Entity Types

```ts
// Filter transactions by block number
const { transactions } = await client.query({
  transactions: {
    fields: ['id', 'blockNumber', 'transactionHash'],
    limit: 5,
    where: {
      blockNumber_gt: '14760000'
    }
  }
});
```

### Direct GraphQL Queries

For more complex/custom queries, you can use direct GraphQL using client.request:

```ts
// Note: Enums must be in uppercase in raw GraphQL queries
const query = `
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
```

### Connection Queries for Pagination

```ts
// For connection queries with pagination support
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
`;

const result = await client.request(query);
```

## License

[MIT](LICENSE)
