export interface Network {
    name: string
    shortName: string
}

export function getNetwork(chainID: number): Network | undefined {
    if(chainID === 1) {
        return { name: 'Ethereum', shortName: 'eth' }
    } else if(chainID === 80001) {
        return { name: 'Polygon Mumbai', shortName: 'matic' }
    } else if(chainID === 5) {
        return { name: 'Goerli', shortName: 'geth' }
    } else if(chainID === 137) {
        return { name: 'Polygon', shortName: 'matic' }
    } else if(chainID === 122) {
        return { name: 'Fuse', shortName: 'fuse' }
    } else if (chainID === 420) {
        return { name: "Optimism Goerli", shortName: 'OP Goerli' }
    } else if (chainID === 10) {
        return { name: "Optimism", shortName: 'OP' }
    } else if (chainID === 42161) {
        return { name: "Arbitrum", shortName: 'ARB' }
    } else if (chainID === 11155111) {
        return { name: "Sepolia", shortName: 'ETH Sepolia' }
    } else if(chainID === 8453) {
        return { name: "Base", shortName: "BASE" }
    } else if(chainID === 421613) {
        return { name: "Arbitrum Goerli", shortName: "ARB Goerli" }
    } else if(chainID === 43113) {
        return { name: "Avalanche Fui", shortName: "AVAX Fuji" }
    }
    
    return undefined
}