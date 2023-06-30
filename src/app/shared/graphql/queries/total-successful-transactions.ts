export const TotalSuccessfulTransactionsQuery = `
    query TotalSuccessfulTransactions($from: DateTime, $to: DateTime, $granularity: Duration, $projectId: UUID!, $filter: EventFilter, $pagination: Pagination) {
        totalSuccessfulTransactions(from: $from, to: $to, granularity: $granularity, projectId: $projectId, filter: $filter, pagination: $pagination) {
            from
            to
            value
        }
    }
`
