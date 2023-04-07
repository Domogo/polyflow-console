export const TotalSuccessfulTransactionsQuery = `
    query TotalSuccessfulTransactions($from: DateTime, $to: DateTime, $granularity: Duration, $projectId: UUID!, $filter: EventFilter) {
        totalSuccessfulTransactions(from: $from, to: $to, granularity: $granularity, projectId: $projectId, filter: $filter) {
            from
            to
            value
        }
    }
`
