export const TotalCancelledTransactionsQuery = `
    query TotalCancelledTransactions($from: DateTime, $to: DateTime, $granularity: Duration, $projectId: UUID!, $filter: EventFilter) {
        totalCancelledTransactions(from: $from, to: $to, granularity: $granularity, projectId: $projectId, filter: $filter) {
            from
            to
            value
        }
    }
`
