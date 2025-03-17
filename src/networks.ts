export const ARBITRUM_URL = 'https://rail-squid.squids.live/squid-railgun-arbitrum-v2/graphql';
export const BSC_URL = 'https://rail-squid.squids.live/squid-railgun-bsc-v2/graphql';
export const ETHEREUM_URL = 'https://rail-squid.squids.live/squid-railgun-ethereum-v2/graphql';
export const ETHEREUM_SEPOLIA_URL =
  'https://rail-squid.squids.live/squid-railgun-eth-sepolia-v2/graphql';
export const POLYGON_URL = 'https://rail-squid.squids.live/squid-railgun-polygon-v2/graphql';

export const VALID_SUBSQUID_URLS = [
  ETHEREUM_URL,
  ARBITRUM_URL,
  ETHEREUM_SEPOLIA_URL,
  POLYGON_URL,
  BSC_URL,
];

export const NETWORK_CONFIG = {
  arbitrum: ARBITRUM_URL,
  bsc: BSC_URL,
  ethereum: ETHEREUM_URL,
  ethereumSepolia: ETHEREUM_SEPOLIA_URL,
  polygon: POLYGON_URL,
} as const;

export type NetworkName = keyof typeof NETWORK_CONFIG;

export const SUPPORTED_NETWORKS = Object.keys(NETWORK_CONFIG) as NetworkName[];
