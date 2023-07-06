export const ListBrowsersQuery = `
    query ListBrowsers($projectId: UUID!, $filter: EventFilter) {
        listBrowsers(projectId: $projectId, filter: $filter) {
            name
            totalWalletConnections
            uniqueWalletConnections
            executedTransactions
            uniqueUsersLanded
        }
    }
`
