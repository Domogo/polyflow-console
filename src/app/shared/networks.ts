export interface Network {
    name: string
    shortName: string
}

export function getNetwork(chainID: number): Network | undefined {
    if(chainID === 1) {
        return { name: 'Ethereum', shortName: 'eth' }
    }
    return undefined
}