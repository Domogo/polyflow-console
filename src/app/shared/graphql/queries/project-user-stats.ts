export const ProjectUserStatsQuery = `
    query ProjectUserStats($projectId: UUID!, $filter: EventFilter) {
        projectUserStats(projectId: $projectId, filter: $filter) {
            totalUsers
            usersWithWallet
            usersWithConnectedWallet
            usersWithExecutedTx
            usersWithMultipleExecutedTx
        }
    }
`
