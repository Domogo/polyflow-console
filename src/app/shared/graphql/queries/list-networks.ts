export const ListNetworksQuery = `
    query ListNetworks($projectId: UUID!, $filter: EventFilter) {
        listNetworks(projectId: $projectId, filter: $filter) {
            chainId
            totalWalletConnections
            uniqueWalletConnections
            executedTransactions
        }
    }
`
