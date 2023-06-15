export const TotalConnectedWalletsQuery = `
    query TotalConnectedWallets($from: DateTime, $to: DateTime, $granularity: Duration, $projectId: UUID!, $filter: EventFilter, $pagination: Pagination) {
        totalConnectedWallets(from: $from, to: $to, granularity: $granularity, projectId: $projectId, filter: $filter, pagination: $pagination) {
            from
            to
            value
        }
    }
`
