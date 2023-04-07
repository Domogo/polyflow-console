export const AverageTransactionsQuery = `
    query AverageTransactions($from: DateTime, $to: DateTime, $granularity: Duration, $projectId: UUID!, $filter: EventFilter) {
        averageTransactions(from: $from, to: $to, granularity: $granularity, projectId: $projectId, filter: $filter) {
            movingAverages {
                from
                to
                averageValue
            }
            averageValue
        }
    }
`
