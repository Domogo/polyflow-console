export const GetPortfolioQuery = `
    query GetPortfolio($address: String!) {
        getPortfolio(walletAddress: $address) {
            walletAddress,
            nativeAssetBalances {
                name,
                chainId,
                amount,
                value
            },
            fungibleTokenBalances {
                name,
                tokenAddress,
                chainId,
                amount,
                value
            },
            nftTokenBalances {
                name,
                tokenAddress,
                chainId,
                ownsAsset,
                amountOfOwnedAssets,
                totalValue
            },
            failedRpcCalls {
                tokenAddress,
                chainId,
                isNft
            },
            totalValue,
            updatedAt
        }
    }
`
