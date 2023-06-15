export const TotalNewWalletsQuery = `
    query TotalNewWallets($from: DateTime, $to: DateTime, $granularity: Duration, $projectId: UUID!, $filter: EventFilter, $pagination: Pagination) {
        totalNewWallets(from: $from, to: $to, granularity: $granularity, projectId: $projectId, filter: $filter, pagination: $pagination) {
            from
            to
            value
        }
    }
`
