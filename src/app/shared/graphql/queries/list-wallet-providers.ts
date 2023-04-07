export const ListWalletProvidersQuery = `
    query ListWalletProviders($projectId: UUID!, $filter: EventFilter) {
        listWalletProviders(projectId: $projectId, filter: $filter) {
            name
            totalWalletConnections
            uniqueWalletConnections
            executedTransactions
        }
    }
`
