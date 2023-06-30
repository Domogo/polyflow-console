export const GetPortfolioQuery = `
    query GetPortfolio($address: string) {
        getPortfolio(address: $address) {
            walletAddress,
            nativeAssetBalances: {
                name,
                chainId,
                amount,
                value
            },
            fungibleTokenBalances: {
                name,
                tokenAddress,
                chainId,
                amount,
                value
            },
            nftTokenBalances: {
                name,
                tokenAddress,
                chainId,
                ownsAsset,
                amountOfOwnedAssets,
                totalValue
            },
            failedRpcCalls: {
                tokenAddress,
                chainid,
                isNft
            },
            totalValue,
            updatedAt
        }
    }
`
