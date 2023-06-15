export const ProjectUserStatsQuery = `
    query ProjectUserStats($projectId: UUID!, $filter: EventFilter, $from: DateTime, $to: DateTime) {
        projectUserStats(projectId: $projectId, filter: $filter, from: $from, to: $to) {
            totalUsers
            usersWithWallet
            usersWithConnectedWallet
            usersWithExecutedTx
            usersWithMultipleExecutedTx
        }
    }
`
