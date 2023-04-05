export const TotalConnectedWalletsQuery = `
    query TotalConnectedWallets($from: DateTime, $to: DateTime, $granularity: Duration, $projectId: UUID!, $filter: EventFilter) {
        totalConnectedWallets(from: $from, to: $to, granularity: $granularity, projectId: $projectId, filter: $filter) {
            from,
            to,
            value
        }
    }
`
