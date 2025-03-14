export const ETHEREUM_URL = 'https://rail-squid.squids.live/squid-railgun-ethereum-v2/graphql';
export const ARBITRUM_URL = 'https://rail-squid.squids.live/squid-railgun-arbitrum-v2/graphql';
export const ETHEREUM_SEPOLIA_URL = 'https://rail-squid.squids.live/squid-railgun-eth-sepolia-v2/graphql';
export const POLYGON_URL = 'https://rail-squid.squids.live/squid-railgun-polygon-v2/graphql';
export const BSC_URL = 'https://rail-squid.squids.live/squid-railgun-bsc-v2/graphql';
export const VALID_SUBSQUID_URLS = [
    ETHEREUM_URL,
    ARBITRUM_URL,
    ETHEREUM_SEPOLIA_URL,
    POLYGON_URL,
    BSC_URL,
];
export var NetworkName;
(function (NetworkName) {
    // Mainnets
    NetworkName["Ethereum"] = "Ethereum";
    NetworkName["BNBChain"] = "BNB_Chain";
    NetworkName["Polygon"] = "Polygon";
    NetworkName["Arbitrum"] = "Arbitrum";
    // Testnets
    NetworkName["EthereumSepolia"] = "Ethereum_Sepolia";
    NetworkName["PolygonAmoy"] = "Polygon_Amoy";
    // Dev only
    NetworkName["Hardhat"] = "Hardhat";
})(NetworkName || (NetworkName = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0d29ya3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbmV0d29ya3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLGtFQUFrRSxDQUFDO0FBQy9GLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxrRUFBa0UsQ0FBQztBQUMvRixNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FDL0IscUVBQXFFLENBQUM7QUFDeEUsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLGlFQUFpRSxDQUFDO0FBQzdGLE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyw2REFBNkQsQ0FBQztBQUVyRixNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRztJQUNqQyxZQUFZO0lBQ1osWUFBWTtJQUNaLG9CQUFvQjtJQUNwQixXQUFXO0lBQ1gsT0FBTztDQUNSLENBQUM7QUFDRixNQUFNLENBQU4sSUFBWSxXQWFYO0FBYkQsV0FBWSxXQUFXO0lBQ3JCLFdBQVc7SUFDWCxvQ0FBcUIsQ0FBQTtJQUNyQixxQ0FBc0IsQ0FBQTtJQUN0QixrQ0FBbUIsQ0FBQTtJQUNuQixvQ0FBcUIsQ0FBQTtJQUVyQixXQUFXO0lBQ1gsbURBQW9DLENBQUE7SUFDcEMsMkNBQTRCLENBQUE7SUFFNUIsV0FBVztJQUNYLGtDQUFtQixDQUFBO0FBQ3JCLENBQUMsRUFiVyxXQUFXLEtBQVgsV0FBVyxRQWF0QiJ9