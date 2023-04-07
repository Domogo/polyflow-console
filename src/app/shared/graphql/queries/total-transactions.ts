export const TotalTransactionsQuery = `
    query TotalTransactions($from: DateTime, $to: DateTime, $granularity: Duration, $projectId: UUID!, $filter: EventFilter) {
        totalTransactions(from: $from, to: $to, granularity: $granularity, projectId: $projectId, filter: $filter) {
            from
            to
            value
        }
    }
`
