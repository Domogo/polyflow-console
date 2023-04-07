export const TotalNewWalletsQuery = `
    query TotalNewWallets($from: DateTime, $to: DateTime, $granularity: Duration, $projectId: UUID!, $filter: EventFilter) {
        totalNewWallets(from: $from, to: $to, granularity: $granularity, projectId: $projectId, filter: $filter) {
            from
            to
            value
        }
    }
`
