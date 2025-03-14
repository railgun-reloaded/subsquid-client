// Re-export from client.ts
export { SubsquidClient, isNetworkValid } from './client.js';

// Re-export from networks.ts
export { ETHEREUM_URL, ETHEREUM_SEPOLIA_URL, VALID_SUBSQUID_URLS } from './networks;

// Re-export gql for external use
export { gql } from 'graphql-tag';

// Note: These functions are for testing purposes only and not exported from example.ts
