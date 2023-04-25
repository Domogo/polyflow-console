export const GetUserWalletAndTransactionStatsQuery = `
    query GetUserWalletAndTransactionStats($field: EventTrackerModelField!, $projectId: UUID!, $from: DateTime, $to: DateTime, $filter: EventFilter) {
        getUserWalletAndTransactionStats(field: $field, projectId: $projectId, from: $from, to: $to, filter: $filter) {
            name
            totalUsers
            usersWithWallet
            usersWithConnectedWallet
            totalWalletConnections
            uniqueWalletConnections
            executedTransactions
            usersWithExecutedTx
        }
    }
`
