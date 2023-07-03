export const ListCountriesQuery = `
    query ListCountries($projectId: UUID!, $filter: EventFilter) {
        listCountries(projectId: $projectId, filter: $filter) {
            name
            totalWalletConnections
            uniqueWalletConnections
            executedTransactions
            uniqueUsersLanded
        }
    }
`
