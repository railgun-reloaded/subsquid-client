// Subsquid network URLs
const ARBITRUM_URL = 'https://rail-squid.squids.live/squid-railgun-arbitrum-v2/graphql';
const BSC_URL = 'https://rail-squid.squids.live/squid-railgun-bsc-v2/graphql';
const ETHEREUM_URL = 'https://rail-squid.squids.live/squid-railgun-ethereum-v2/graphql';
const ETHEREUM_SEPOLIA_URL =
  'https://rail-squid.squids.live/squid-railgun-eth-sepolia-v2/graphql';
const POLYGON_URL = 'https://rail-squid.squids.live/squid-railgun-polygon-v2/graphql';

export const NETWORK_CONFIG = {
  arbitrum: ARBITRUM_URL,
  bsc: BSC_URL,
  ethereum: ETHEREUM_URL,
  ethereumSepolia: ETHEREUM_SEPOLIA_URL,
  polygon: POLYGON_URL,
} as const;

export type NetworkName = keyof typeof NETWORK_CONFIG;

export const SUPPORTED_NETWORKS = Object.keys(NETWORK_CONFIG) as NetworkName[];