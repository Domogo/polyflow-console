export const PeriodActiveWalletsQuery = `
    query PeriodActiveWallets($from: DateTime, $to: DateTime, $granularity: Duration, $projectId: UUID!, $filter: EventFilter) {
        periodActiveWallets(from: $from, to: $to, granularity: $granularity, projectId: $projectId, filter: $filter) {
            values {
                from
                to
                value
            }
            averageValue
        }
    }
`
