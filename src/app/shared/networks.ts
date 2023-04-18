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
    }
    return undefined
}