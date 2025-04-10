// Subsquid network URLs
const ARBITRUM_URL = 'https://rail-squid.squids.live/squid-railgun-arbitrum-v2/graphql'
const BSC_URL = 'https://rail-squid.squids.live/squid-railgun-bsc-v2/graphql'
const ETHEREUM_URL = 'https://rail-squid.squids.live/squid-railgun-ethereum-v2/graphql'
const ETHEREUM_SEPOLIA_URL =
  'https://rail-squid.squids.live/squid-railgun-eth-sepolia-v2/graphql'
const POLYGON_URL = 'https://rail-squid.squids.live/squid-railgun-polygon-v2/graphql'

const NETWORK_CONFIG = {
  arbitrum: ARBITRUM_URL,
  bsc: BSC_URL,
  ethereum: ETHEREUM_URL,
  ethereumSepolia: ETHEREUM_SEPOLIA_URL,
  polygon: POLYGON_URL,
} as const

type NetworkName = keyof typeof NETWORK_CONFIG

/**
 * Configuration options for initializing the SubsquidClient
 */
type SubsquidClientOptions = {
  customSubsquidUrl?: string;
  network?: string;
}

const SUPPORTED_NETWORKS = Object.keys(NETWORK_CONFIG) as NetworkName[]

export { NETWORK_CONFIG, SUPPORTED_NETWORKS, type NetworkName, type SubsquidClientOptions }
