export class ChainExplorers {

    private static getBaseForChainID(id: number) {
        if(id === 1) {
            return 'https://etherscan.io'
        } else {
            return null
        }
    }

    public static generateLinkForAddress(address: string, chainId: number) {
        const base = ChainExplorers.getBaseForChainID(chainId)
        if(base === null) { return null }
        return `${base}/address/${address}`
    }

    public static generateBlockscanLink(address: string) {
        return `https://blockscan.com/address/${address}`
    }

}